import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('tasks.db');

export const initDB = () => {
  db.transaction((tx: SQLite.SQLTransaction) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, color TEXT);',
      [],
      () => {}, 
      (_, error) => {
        console.error("Error initializing database:", error);
        return true; 
      }
    );
  });
};

export const getTasks = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        'SELECT * FROM tasks;',
        [],
        (_, result) => resolve(result.rows['_array']),
        (_, error) => {
            reject(error);
            return true; 
          }
      );
    });
  });
};

export const getTask = (id: number): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE id = ?;',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows['_array'][0]);
          } else {
            resolve(null); 
          }
        },
        (_, error) => {
            reject(error);
            return true; 
          }
      );
    });
  });
};

export const addTask = (task: { title: string; description: string; color: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        'INSERT INTO tasks (title, description, color) VALUES (?, ?, ?);',
        [task.title, task.description, task.color],
        () => resolve(),
        (_, error) => {
            reject(error);
            return true; 
          }
      );
    });
  });
};

export const updateTask = (id: number, task: { title: string; description: string; color: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        'UPDATE tasks SET title = ?, description = ?, color = ? WHERE id = ?;',
        [task.title, task.description, task.color, id],
        () => resolve(),
        (_, error) => {
            reject(error);
            return true; 
          }
      );
    });
  });
};

export const deleteTask = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?;',
        [id],
        () => resolve(),
        (_, error) => {
            reject(error);
            return true; 
          }
      );
    });
  });
};
