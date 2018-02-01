import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder  ) {
    this.loginForm = formBuilder.group({ 
        email: [ 
          '', 
          Validators.compose([Validators.required]) 
        ], 
        password: [ 
          '', 
          Validators.compose([Validators.required, Validators.minLength(6)]) 
        ] 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  async login():Promise<any>{
    console.log("login clicked");
    //this.authProvider.loginUser();
    let loading: Loading = this.loadingCtrl.create();
    loading.present();

    try {
      await this.authProvider.loginUser().then(function(user){
        //console.log(user);
        loading.dismiss();
      }).catch(function(error){
        loading.dismiss();
        const alert: Alert = this.alertCtrl.create({ 
          message: error.message, 
          buttons: [{ text: 'Ok', role: 'cancel' }] 
        }); 
        alert.present();
      });  
      
    } catch (error) {
      await loading.dismiss();
      const alert: Alert = this.alertCtrl.create({ 
        message: error.message, 
        buttons: [{ text: 'Ok', role: 'cancel' }] 
      }); 
      alert.present();
    }
   
  }

  goToSignup(): void { 
    this.navCtrl.push('SignupPage'); 
  } 

  async loginUserWithEmail(): Promise<any> { 
    if (!this.loginForm.valid) { 
      console.log('Form not ready'); 
    } else { 
      let loading: Loading = this.loadingCtrl.create(); 
      loading.present(); 
      const email: string = this.loginForm.value.email; 
      const password: string = this.loginForm.value.password;

      try {
        await this.authProvider.loginUserWithEmail(email, password); 
        await loading.dismiss(); 
        //this.navCtrl.setRoot(HomePage);
      } catch (error) {
        await loading.dismiss(); 
        const alert: Alert = this.alertCtrl.create({ 
          message: error.message, 
          buttons: [{ text: 'Ok', role: 'cancel' }] 
        }); 
        alert.present();
      }
    } 
  }
}
