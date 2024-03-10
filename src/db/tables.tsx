export const Tables = {
    Card: {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        code: 'VARCHAR(30)',
        name: 'VARCHAR(100) NOT NULL',
        type: 'INTEGER NOT NULL DEFAULT 0',
        description: 'TEXT',
        isFavorite: 'BOOLEAN NOT NULL DEFAULT FALSE',
        counter: 'INTEGER NOT NULL DEFAULT 0',
        dateCreated: 'DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
        dateUpdated: 'DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
        dateLastSeen: 'DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
    },
    Photo: {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        cardId: 'INTEGER',
        front: 'VARCHAR(50)',
        back: 'VARCHAR(50)',
        code: 'VARCHAR(50)',
    },
    Settings: {

    }
} as const; 
