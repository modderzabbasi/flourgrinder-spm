export interface DBService {
  getCollections(): any;
  getAll(opts: any, collection: string): Promise<any[]>;
  getByKey(_key: string, collection: string): Promise<any>;
  getByKeys(_key: string[], collection: string): Promise<any>;
  getByBindVars(bindVars: object, collection: string): Promise<any>;
  updateBykey(_key: string, body: any, collection: string): Promise<any>;
  insertOne(body: any, collection: string): Promise<any>;
  deleteOne(_key: string, collection: string): Promise<any>;
  deleteByKeys(_keys: string[], tcollection: string): Promise<any>;
  count(collection: string): Promise<any>;
}
