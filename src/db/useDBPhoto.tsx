// import { useEffect } from 'react';
// import { db } from './db';

// export const useDBPhoto = () => {
//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS Photo (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 // frontPhoto VARCHAR(30),
//                 // backPhoto VARCHAR(100) NOT NULL,
//                 // codePhoto VARCHAR(100) NOT NULL,
//                 // codePhotoURL,
//                 // code INTEGER DEFAULT 0,
//                 // description TEXT,
//                 // isFavorite BOOLEAN NOT NULL DEFAULT FALSE,
//                 // counter INTEGER NOT NULL DEFAULT 0,
//                 // dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//                 // dateUpdated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//                 // dateLastSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
//                 )`,
//       );
//     });
//   }, []);
// };
