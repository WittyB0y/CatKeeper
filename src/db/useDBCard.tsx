import { useEffect, useState } from 'react';
import { db } from './db';
import type { ICardWithoutId, ICard } from '../components/Card/type';

type TCardsMethods = {
  cards: ICard[];
  getCards: TGetCards;
  addCardToDB: TAddCardToDB;
  deleteCardById: TDeleteCardById;
  deleteAllCards: TDeleteAllCards;
  updateCardById: TUpdateCardById;
};

type TGetCards = () => Promise<ICard[]>;
type TAddCardToDB = (card: ICardWithoutId) => Promise<void>;
type TDeleteCardById = (id: number) => Promise<void>;
type TDeleteAllCards = () => Promise<void>;
type TUpdateCardById = (cardId: number, cardField: Partial<ICard>) => Promise<void>;

export function useDBCard(): TCardsMethods {
  const [cards, setCards] = useState<ICard[]>([]);

  const getCards: TGetCards = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Card',
          [],
          (_, result) => {
            setCards(result.rows._array);
            resolve(result.rows._array);
          },
          () => {
            reject();
            return false;
          },
        );
      });
    });
  };

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Card (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            code VARCHAR(30), 
            name VARCHAR(100) NOT NULL, 
            type INTEGER DEFAULT 0, 
            description TEXT, 
            isFavorite BOOLEAN NOT NULL DEFAULT FALSE,
            counter INTEGER NOT NULL DEFAULT 0, 
            dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            dateUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            dateLastSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`,
      );
    });
  }, []);

  const addCardToDB: TAddCardToDB = (card) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Card (code, name, type, description, isFavorite, counter, dateCreated, dateUpdated, dateLastSeen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            card.code,
            card.name,
            card.type,
            card.description,
            card.isFavorite ? 1 : 0,
            card.counter,
            card.dateCreated,
            card.dateUpdated,
            card.dateLastSeen,
          ],
          () => {
            console.log('Item added successfully');
            resolve();
          },
          () => {
            console.error('Error adding item:');
            reject();
            return false;
          },
        );
      });
    });
  };

  const deleteCardById: TDeleteCardById = (cardId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Card WHERE id = ?',
          [cardId],
          () => {
            console.log('Card deleted successfully');
            resolve();
          },
          () => {
            console.error('Error deleting card:');
            reject();
            return false;
          },
        );
      });
    });
  };

  const deleteAllCards: TDeleteAllCards = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Card',
          [],
          () => {
            console.log('All cards deleted successfully');
            resolve();
          },
          () => {
            console.error('Error deleting all cards:');
            reject();
            return false;
          },
        );
      });
    });
  };

  const updateCardById: TUpdateCardById = (cardId, cardField) => {
    const fieldToUpdate = Object.keys(cardField);
    const valuesFields: string[] = Object.values(cardField).map((elem) => String(elem));
    const fieldsQuery: string = fieldToUpdate
      .reduce((accumalator, currentValue) => accumalator + `${currentValue}=? `, '')
      .split(' ')
      .join(', ');
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE Card SET ${fieldsQuery} dateUpdated = ? WHERE id = ${cardId}`,
          [...valuesFields, new Date().toISOString().slice(0, 19).replace('T', ' ')],
          () => {
            console.log('Card updated successfully');
            resolve();
          },
          () => {
            console.error('Error updating card:');
            reject();
            return false; // TODO
          },
        );
      });
    });
  };

  return { cards, getCards, addCardToDB, deleteCardById, deleteAllCards, updateCardById };
}
