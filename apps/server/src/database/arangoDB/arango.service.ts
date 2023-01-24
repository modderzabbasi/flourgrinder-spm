import { Injectable } from '@nestjs/common';
import { Database, aql } from 'arangojs';

@Injectable()
export class ArangoDBService {
  private readonly db: Database;

  constructor() {
    this.db = new Database({
      url: 'http://localhost:8529',
      databaseName: 'SPM',
    });
    this.db.useBasicAuth('root', 'admin');
  }

  async getCollections() {
    const collections = await this.db.listCollections();
    return collections;
  }

  async getAll(opts: any, collection): Promise<any[]> {
    const rst: any = await this.db.collection(collection).all(opts);
    return rst._result;
  }

  async getByKey(_key: string, collection): Promise<any> {
    const rst: any[] = await this.db
      .collection(collection)
      .lookupByKeys([_key]);
    return rst[0];
  }

  async getByKeys(_key: string[], collection): Promise<any> {
    return await this.db.collection(collection).lookupByKeys([..._key]);
  }

  async getByBindVars(bindVars: object, collection): Promise<any> {
    return await this.db.collection(collection).firstExample(bindVars);
  }

  async updateBykey(_key: string, body: any, collection): Promise<any> {
    return await this.db
      .collection(collection)
      .update(_key, body, { returnNew: true });
  }

  async insertOne(body: any, collection): Promise<any> {
    return await this.db.collection(collection).save(body, { returnNew: true });
  }

  // async insertList(list: any[]): Promise<any[]> { }
  async deleteOne(_key: string, collection): Promise<any> {
    return await this.db.collection(collection).removeByKeys([_key], {});
  }

  async deleteByKeys(_keys: string[], collection): Promise<any> {
    return await this.db.collection(collection).removeByKeys([..._keys], {});
  }

  async count(collection): Promise<any> {
    return await this.db.collection(collection).count();
  }
}
