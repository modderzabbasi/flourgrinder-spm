// import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { actionCodeSettings } from './constants/action-code';
import { constants } from '../server.constants';

const {
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_AUTH_PROVIDER_X509,
  FIREBASE_AUTH_URI,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509,
  FIREBASE_TOKEN_URI,
} = constants.firebaseConfig;

const firebase_params = {
  type: FIREBASE_TYPE,
  projectId: FIREBASE_PROJECT_ID,
  privateKeyId: FIREBASE_PRIVATE_KEY_ID,
  privateKey: FIREBASE_PRIVATE_KEY,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  clientId: FIREBASE_CLIENT_ID,
  authUri: FIREBASE_AUTH_URI,
  tokenUri: FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: FIREBASE_AUTH_PROVIDER_X509,
  clientC509CertUrl: FIREBASE_CLIENT_X509,
};

@Injectable()
export class IDPService {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(
        JSON.parse(JSON.stringify(firebase_params)),
      ),
      databaseURL: 'https://spm-demo-6f1c3.firebaseio.com',
    });
  }

  // To Verify JWT Token returns decoded payload
  async verify(token): Promise<any> {
    try {
      const decodedToken = await this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''));
      return decodedToken;
    } catch (error) {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }

  // To Create User with provided data return back created userRecord
  async createUser(data): Promise<any> {
    try {
      const userRecord = await this.defaultApp.auth().createUser(data);
      return userRecord;
    } catch (error) {
      throw new HttpException(
        'Unable to Register at this moment!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  // To ResetPassword with given uid and newPassword return updated UserRecord
  async resetPassword(uid, data): Promise<any> {
    try {
      const userRecord = await this.defaultApp.auth().updateUser(uid, data);
      return userRecord;
    } catch (error) {
      throw new HttpException(
        'Unable Reset Password at this moment',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  // To forgot password:1.send an email 2.New Password Set  through Link 3.Return msg
  async forgotPassword(email: string): Promise<any> {
    try {
      const link = await this.defaultApp
        .auth()
        .generatePasswordResetLink(email, actionCodeSettings);

      //This code is use for sending mails through sendgrid

      // const sendMail = await await this.mailService.sendMail({
      //   to: email,
      //   from: 'spmprojectdemo@gmail.com',
      //   subject: 'Forgot Password',
      //   template: 'forgotPassword',
      //   context: {
      //     forgot: { link: link },
      //   },
      // });
      const response = await { msg: 'mail has been sent Successfully. Review' };
      return response;
    } catch (error) {
      throw new HttpException(
        'Unable to Configure Forgot Password at this moment!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // To delete User with given uid return user has been deleted msg
  async deleteUser(uid: string): Promise<any> {
    try {
      const response = await this.defaultApp.auth().deleteUser(uid);
      return response;
    } catch (error) {
      throw new HttpException(
        'Unable to Delete User!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
