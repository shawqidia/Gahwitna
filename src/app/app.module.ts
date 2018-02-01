import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HistoryPage } from '../pages/history/history';
import { MenuPage } from '../pages/menu/menu';
import { LocationPage } from '../pages/location/location';
import { ContactusPage } from '../pages/contactus/contactus';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { AngularFirestoreModule } from 'angularfire2/firestore'; 
import { firebaseConfig } from './credentials';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HistoryPage,
    MenuPage,
    LocationPage,
    ContactusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    HistoryPage,
    MenuPage,
    LocationPage,
    ContactusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GoogleMaps,
    FirebaseDataProvider
  ]
})
export class AppModule {}
