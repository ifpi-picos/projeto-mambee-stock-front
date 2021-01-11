import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { Crud } from '../interfaces/crud/crud';
import { Model } from '../models/model';

import * as firebase from 'firebase/app';

export abstract class FirebaseInterface<T extends Model> implements Crud<T> {
  ref: AngularFirestoreCollection<T>;

  constructor(
    protected type: { new (): T },
    protected firestore: AngularFirestore,
    public path: string
  ) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map((snapshot) => this.docToClass(snapshot)));
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }
  listByField(collection, field, value){
    return this.firestore
        .collection(collection, ref => ref.where(field, '==', value))
        .valueChanges()
  }
  createOrUpdate(item: T, uid?: string): Promise<any> {
    if (!item) return;
    
    let obj = null;

    if (item instanceof this.type){
      obj = item.toObject();
    } else {
      obj = item;
    }
    if (uid) {
      obj.id = uid
      return this.ref.doc(uid).set(obj);
    } 
    if(obj.id){
      return this.ref.doc(obj.id).set(obj);
    }
    else{
      return this.ref.add(obj).then((res) => {
        obj.id = res.id; // Para salvar com o atributo id
        this.ref.doc(res.id).set(obj);
      });
    }
  }

  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }

  docToClass(snapshotDoc): T {
    let obj = {
      id: snapshotDoc.id,
      ...(snapshotDoc.data() as T),
    };
    let typed = plainToClass(this.type, obj);
    return typed;
  }

  updateField(id: string, field: string, value: any){
    return this.ref.doc(id).update({[field]: value})
  }
  async fieldIncrementOrDecrement(id: string, field: string, value: any){
    let isNegative: boolean
    await this.get(id)
      .subscribe(doc=>{
        if((doc[field] + value) >= 0){isNegative = false}  
      })
      if(isNegative ==  false){
        return this.ref.doc(id).update({[field]:  firebase.firestore.FieldValue.increment(value)})
      }
  }
  addOrRemoveInArray(add: boolean, id: string, field: string, value: any){
      if(add == true){
        return this.ref.doc(id).update({[field]:  firebase.firestore.FieldValue.arrayUnion(value)})
      }
      else{
        return this.ref.doc(id).update({[field]:  firebase.firestore.FieldValue.arrayRemove(value)})
      }
  }
}
