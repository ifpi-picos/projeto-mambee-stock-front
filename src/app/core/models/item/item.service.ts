import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseInterface } from '../../services/firebase.interface';

import { ItemModel } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends FirebaseInterface<ItemModel> {
  constructor(firestore: AngularFirestore) {
    super(ItemModel, firestore, 'itens');
  }
}
