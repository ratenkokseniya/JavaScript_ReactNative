import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('films.db');

export const initDatabase = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS genres (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      year INTEGER,
      director TEXT,
      genre_id INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (genre_id) REFERENCES genres(id)
    );
  `)
    .then(() => {
      console.log('✅ Database initialized');
    })
    .catch(err => {
      console.log('❌ Error during database init:', err);
    });
};

export const getDB = () => db;
