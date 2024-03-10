import { useEffect, useState } from 'react';
import { openDatabase } from 'expo-sqlite';

// open or create the new DB
const db = openDatabase('database.db');


export function useDB<T>() {
  const [items, setItems] = useState<T[]>([]);
  console.log('', items);

  useEffect(() => {
    // create DB if dosen't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)',
      );
    });
    fetchItems(); // Получаем данные из базы данных при монтировании компонента
  }, []);

  // Функция для добавления данных в таблицу
  const addItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO items (name, quantity) VALUES (?, ?)',
        ['apple', 10],
        (/* _, result */) => {
          console.log('Item added successfully');
          fetchItems(); // После добавления обновляем данные
        },
        // (_, error) => {
        //   console.log('Error adding item: ', error);
        // },
      );
    });
  };

  // Функция для удаления данных из таблицы
  const deleteItem = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [id],
        (/* _, result */) => {
          console.log('Item deleted successfully');
          fetchItems(); // После удаления обновляем данные
        },
        // (_, error) => {
        //   console.log('Error deleting item: ', error);
        // },
      );
    });
  };

  // Функция для получения данных из таблицы
  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, result) => {
          const { rows } = result;
          const data: Item[] = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i) as Item);
          }
          // FIXME
          setItems(data as T[]); // Устанавливаем полученные данные в state
        },
        // (_, error) => {
        //   console.log('Error fetching items: ', error);
        // },
      );
    });
  };
  return { addItem, deleteItem, fetchItems };
}
