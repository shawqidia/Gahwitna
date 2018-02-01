import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import * as firebase from 'firebase/app'; 

/*
  Generated class for the FirebaseDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDataProvider {
  
  constructor(public fireStore: AngularFirestore) {
    console.log('Hello FirebaseDataProvider Provider');
  }

  async getMenuGroups():Promise<any>{
    const items: firebase.firestore.DocumentSnapshot = await firebase.firestore().doc(`menuItems/1oQphAD6PX7ofnLtRq84`).get();
    return items.data();
    //console.log(firebase.firestore;
  }

  getMenuGroups1(): AngularFirestoreCollection<any> { 
    return this.fireStore.collection<any>( 
      `/menuItems`, // This creates the reference 
      ref => ref.orderBy('order') // This is the query 
    ); 
  }

  getGroupItems(key:string):AngularFirestoreCollection<any>{
    return this.fireStore.collection<any>( 
      `/menuItems/${key}/items`, // This creates the reference 
      ref => ref.orderBy('order') // This is the query 
    ); 
  }

}
