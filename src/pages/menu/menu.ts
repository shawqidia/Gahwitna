import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data'; 
import { Observable } from 'rxjs';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  items:Observable<any[]>;
  it:Observable<any[]>;
  subItems:Observable<any[]>;
  constructor(public fireStore: AngularFirestore, public fb:FirebaseDataProvider) {
    // this.items = [
    //   {name:'Tea', price:1.5},
    //   {name:'Coffee', price: 2.5}
    // ]
    //this.getMenuGroups();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.fb.getMenuGroups().then(it => { 
      this.it = it; 
      console.log(it);
    })
    this.getMenuGroups();
  }

  getMenuGroups(){
    this.items = this.fb.getMenuGroups1().valueChanges();
    console.log(this.items);
  }

  getGroupItems(key:string){
    this.subItems = this.fb.getGroupItems(key).valueChanges();
  }

}
