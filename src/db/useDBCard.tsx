import { useEffect, useState } from 'react';
import { db } from './db';
import { ICard } from '../components/Card/type';

export function useDBCard<ICard>(): ICard[] {
  const [items, setItems] = useState<ICard[]>([]);

  useEffect(() => {
    // create DB if doesn't exist
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
      );
    });
    fetchItems();
  }, []);

  function fetchItems() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Card', [], (_, result) => {
        const { rows } = result;
        const data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows.item(i));
        }
        setItems(data);
      });
    });
  }

  return items;
}

export function addItemToCard(item: ICard) {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Card (code, name, type, description, isFavorite, counter, dateCreated, dateUpdated, dateLastSeen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        item.code,
        item.name,
        item.type,
        item.description,
        item.isFavorite ? 1 : 0,
        item.counter,
        item.dateCreated,
        item.dateUpdated,
        item.dateLastSeen,
      ],
      () => {
        console.log('Item added successfully');
      },
    );
  });
}

export function deleteCardById(cardId: number) {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM Card WHERE id = ?', [cardId], () => {
      console.log('Card deleted successfully');
    });
  });
}

export function deleteAllCards() {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM Card', [], () => {
      //   console.log('All cards deleted successfully');
    });
  });
}
