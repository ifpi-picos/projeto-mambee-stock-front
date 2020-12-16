import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseInterface } from '../../services/firebase.interface';

import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends FirebaseInterface<UserModel> {
  constructor(firestore: AngularFirestore) {
    super(UserModel, firestore, 'users');
  }
}
