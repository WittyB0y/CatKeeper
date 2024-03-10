import { useEffect, useState } from 'react';
import { db } from './db';

export function useDBCard<ICard>() {
  const [items, setItems] = useState<ICard[]>([]);

  useEffect(() => {
    // create DB if doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Card (id INTEGER PRIMARY KEY AUTOINCREMENT, code VARCHAR(30), name VARCHAR(100) NOT NULL, type INTEGER DEFAULT 0, description TEXT, isFavorite BOOLEAN NOT NULL DEFAULT FALSE, counter INTEGER NOT NULL DEFAULT 0, dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, dateUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, dateLastSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
      );
    });
    fetchItems();
  }, []);
  
  function fetchItems() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Card',
        [],
        (_, result) => {
          const { rows } = result;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setItems(data);
        },
        (_, error) => {
          console.log('Error fetching items: ', error);
        }
      );
    });
  }

  return items;
}

export function addItemToCard(item: any) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Card (code, name, type, description, isFavorite, counter, dateCreated, dateUpdated, dateLastSeen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [item.code, item.name, item.type, item.description, item.isFavorite ? 1 : 0, item.counter, item.dateCreated, item.dateUpdated, item.dateLastSeen],
      (_, result) => {
        console.log('Item added successfully');
      },
      (_, error) => {
        console.log('Error adding item: ', error);
      }
    );
  });
}

export function deleteCardById(cardId: number) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Card WHERE id = ?',
      [cardId],
      (_, result) => {
        console.log('Card deleted successfully');
      },
      (_, error) => {
        console.log('Error deleting card: ', error);
      }
    );
  });
}

export function deleteAllCards() {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Card',
      [],
      (_, result) => {
        console.log('All cards deleted successfully');
      },
      (_, error) => {
        console.log('Error deleting cards: ', error);
      }
    );
  });
}
