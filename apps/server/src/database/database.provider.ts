import { Database } from 'arangojs';

const DB_HOSTURL = 'http://127.0.0.1:8529';
const DB_NAME = 'SPM';
const DB_USERNAME = 'root';
const DB_PASSWORD = 'admin';

export const databaseProvider = [
  {
    provide: DB_HOSTURL,
    useFactory: () => {
      const db = new Database({
        url: DB_HOSTURL,
        databaseName: DB_NAME,
      });
      db.useBasicAuth(DB_USERNAME, DB_PASSWORD);
      return db;
    },
  },
];
