import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService extends DatabaseService {
  constructor(@Inject('http://127.0.0.1:8529') private readonly db: Database) {
    super();
  }
  collection: DocumentCollection = this.db.collection('USERS');

  async getHello() {
    try {
      await this.insertOne({
        name: 'Prathamesh Rajendra Moharkar',
        phone: 866965368,
        email: 'prathamesh@gmail.com',
      });
    } catch (err) {
      console.log(err);
    }
    return { msg: 'Success' };
  }
}
