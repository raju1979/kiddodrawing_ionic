import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ShelfPage } from '../pages/shelf/shelf';
import { AddFeed } from '../pages/add-feed/add-feed';

import { Storage } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';

declare var FCMPlugin:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _alertController:AlertController, private _storage: Storage, private _menuCtrl:MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'New Post', component: AddFeed },
      { title: 'Posts', component: ShelfPage },
      { title: 'Profile', component: ProfilePage }
    ];

    /// Throw this in a provider constructor you will use for notifications:
    this.platform.ready().then(() => {
      if(typeof(FCMPlugin) !== "undefined"){
        FCMPlugin.getToken(function(t){
          console.log("Use this token for sending device specific messages\nToken: " + t);
        }, function(e){
          console.log("Uh-Oh!\n"+e);
        });

        FCMPlugin.onNotification(function(d){
          if(d.wasTapped){  
            // Background recieval (Even if app is closed),
            //   bring up the message in UI
          } else {
            // Foreground recieval, update UI or what have you...
          }
        }, function(msg){
          // No problemo, registered callback
        }, function(err){
          console.log("Arf, no good mate... " + err);
        });
      } else console.log("Notifications disabled, only provided in Android/iOS environment");
    });


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
    this.nav.setRoot(page.component);
  };//

  logout(){
    const alert = this._alertController.create({
      title: 'Confirm Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this._storage.clear();
            this._menuCtrl.enable(false);
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });

    alert.present();
  };//


}
