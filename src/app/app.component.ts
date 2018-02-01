import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { MenuPage } from '../pages/menu/menu';
import { LocationPage } from '../pages/location/location';
import { ContactusPage } from '../pages/contactus/contactus';

//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  auth: AuthProvider;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, afAuth: AngularFireAuth, auth: AuthProvider) {
    this.initializeApp();
    this.auth = auth;
    afAuth.authState.subscribe(user => { 
      if (user) { 
        this.rootPage = HomePage; 
      } else {
        this.rootPage = 'LoginPage'; 
      } 
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'History', component: HistoryPage },
      { title: 'Menu', component: MenuPage },
      { title: 'Location', component: LocationPage },
      { title: 'Contact Us', component: ContactusPage },
      { title: 'Logout', component: null}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
      this.nav.setRoot(page.component);
    }else{
      //this.afAuth.auth.signOut();
      this.auth.logoutUser();
    }
  }
}
