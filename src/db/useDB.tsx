import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { openDatabase } from 'expo-sqlite';


// open or create the new DB
const db = openDatabase('database.db');

interface Item {
  id: number;
  name: string;
  quantity: number;
}

export function useDB() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Создаем таблицу, если она не существует
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)'
      );
    });
    fetchItems(); // Получаем данные из базы данных при монтировании компонента
  }, []);

  // Функция для добавления данных в таблицу
  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name, quantity) VALUES (?, ?)',
        ['apple', 10],
        (_, result) => {
          console.log('Item added successfully');
          fetchItems(); // После добавления обновляем данные
        },
        (_, error) => {
          console.log('Error adding item: ', error);
        }
      );
    });
  };

  // Функция для удаления данных из таблицы
  const deleteItem = (id: number) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [id],
        (_, result) => {
          console.log('Item deleted successfully');
          fetchItems(); // После удаления обновляем данные
        },
        (_, error) => {
          console.log('Error deleting item: ', error);
        }
      );
    });
  };

  // Функция для получения данных из таблицы
  const fetchItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, result) => {
          const { rows } = result;
          const data: Item[] = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i) as Item);
          }
          setItems(data); // Устанавливаем полученные данные в state
        },
        (_, error) => {
          console.log('Error fetching items: ', error);
        }
      );
    });
  };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '10%'}}>
//       <Text>Items:</Text>
//       {items.map(item => (
//         <View key={item.id}>
//           <Text>{item.name} - {item.quantity}</Text>
//           <Button title="Delete" onPress={() => deleteItem(item.id)} />
//         </View>
//       ))}
//       <Button title="Add Item" onPress={addItem} />
//     </View>
//   );
return {addItem, deleteItem, fetchItems};
} 
