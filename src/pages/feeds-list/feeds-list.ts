import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-feeds-list',
  templateUrl: 'feeds-list.html',
})
export class FeedsList {

  constructor(public navCtrl: NavController, private _storage: Storage,public navParams: NavParams,private _dataService: DataService,private _alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsListPage');
  }

  ionViewWillEnter(){
    // here we can either return true or false
    // depending on if we want to leave this view

    let userObject:any;


    this._storage.get("userdata")
      .then((val) => {
        userObject = JSON.parse(val);
        this._dataService.validateToken(userObject)
        .subscribe(
          (data) => {
            console.log(data)
            if(data.success == false){
              this.showLogoutAlert()
            }else{

            }
          },
          (err) => this.showLogoutAlert()
        )
        

      })
    
  };//


  showLogoutAlert() {
    
        const alert = this._alertController.create({
          title: 'Not Authenticated',
          message: 'Another device already logged in, login again!',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this._storage.clear();
                setTimeout(() => {
                  this.navCtrl.setRoot(LoginPage)
                }, 1000)
    
              }
            }
          ]
        });
        alert.present();
      };//

}
