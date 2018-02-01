import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth'; 
import { AngularFirestore, /*AngularFirestoreCollection,*/ AngularFirestoreDocument } from 'angularfire2/firestore'; 
import firebase from 'firebase/app'; 
import { userProfile } from '../../models/user-profile'; 

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public fireStore: AngularFirestore,) {
    console.log('Hello AuthProvider Provider');
  }

  //loginUser(): Promise<firebase.User>{
  async loginUser(): Promise<any>{

    var provider = new firebase.auth.FacebookAuthProvider();

    const user: firebase.User = await this.afAuth.auth.signInWithPopup(provider);
    console.log(user);
    const userProfileDocument: AngularFirestoreDocument<any> = await this.fireStore.doc(`userProfile/${user.uid}`);
    await userProfileDocument.set({ 
          id: user.uid, 
          name: user.displayName,
          email: user.email,
          admin: false 
      });
    return user;

    /*var provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(result){
      console.log(result);
      const userProfileDocument: AngularFirestoreDocument<userProfile> = this.fireStore.doc(`userProfile/${result.uid}`);

      userProfileDocument.set({ 
          id: result.uid, 
          email: result.email, 
          admin: false 
      });
      return result;
    }).catch(function(error){
      return error;
    });
    /*firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(credential);
    });*/
  }

  logoutUser(): Promise<void> { 
    return this.afAuth.auth.signOut(); 
  }

  loginUserWithEmail(email: string, password: string): Promise<firebase.User> { 
    return this.afAuth.auth.signInWithEmailAndPassword(email, password); 
  } 

  async createUserWithEmail( email: string, password: string ): Promise<firebase.User> {
    try{
      const user: firebase.User = await this.afAuth.auth .createUserWithEmailAndPassword( email, password );

      const userProfileDocument: AngularFirestoreDocument< userProfile > = this.fireStore.doc(`userProfile/${user.uid}`);

      //const teamId: string = this.fireStore.createId();

      await userProfileDocument.set({ 
          id: user.uid, 
          name: user.displayName,
          email: user.email,
          admin: false 
      });

      //const teamProfile: AngularFirestoreDocument< teamProfile > = this.fireStore.doc(`teamProfile/${teamId}`); 
      
      //await teamProfile.set({ 
      //  id: teamId, 
      //  teamAdmin: adminUser.uid, 
      //  groceryList: null 
      //}); 
      
      return user;
    }catch(err){
      console.log(err);
    }
  }

}
