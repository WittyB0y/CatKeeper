import type { ICard } from '../../components/Card/type';
import { db } from '../../db';

type TgetCardsOrCreateDB = () => ICard[] | []
export const addCard = async (card: ICard) => {
  try {
    await db.transaction((tx) => {
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
          console.log('Card added successfully');
        },
      );
    });
  } catch (error) {
    console.error('Error adding card to DB:', error);
    throw error; // Можно передать ошибку выше для дальнейшей обработки
  }
};

export const getCardsOrCreateDB: TgetCardsOrCreateDB = async () => {
  try {
    const rowsData = [];
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Card (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              code VARCHAR(30), name VARCHAR(100) NOT NULL, 
              type INTEGER DEFAULT 0, 
              description TEXT, 
              isFavorite BOOLEAN NOT NULL DEFAULT FALSE,
              counter INTEGER NOT NULL DEFAULT 0, 
              dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
              dateUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
              dateLastSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`,
          [],
          () => {
            tx.executeSql('SELECT * FROM Card', [], (_, result) => {
              for (let i = 0; i < result.rows.length; i++) {
                rowsData.push(result.rows.item(i));
              }
              resolve(rowsData);
            });
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
    return rowsData;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};


export const deleteCardFromDB = async (id: number) => {
  try {
    await db.transaction((tx) => {
      tx.executeSql('DELETE FROM Card WHERE id = ?', [id], () => {
        console.log('Card deleted successfully');
      });
    });
  } catch (error) {
    console.error('Error deleting card from DB:', error);
    throw error; // Можно передать ошибку выше для дальнейшей обработки
  }
};