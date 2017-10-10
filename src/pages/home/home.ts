import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AddCommentPage } from '../add-comment/add-comment';

declare var _:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  limit = 5;

  feedsArray:Array<any> = [];

  currentId = 0;
  lastObjectId:string ='';

  constructor(public navCtrl: NavController, private _storage: Storage, public navParams: NavParams, private _dataService: DataService, private _alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsListPage');
  }

  ionViewWillEnter() {
    // here we can either return true or false
    // depending on if we want to leave this view

    let userObject: any;


    this._storage.get("userdata")
      .then((val) => {
        userObject = JSON.parse(val);
        this._dataService.validateToken(userObject)
          .subscribe(
          (data) => {
            console.log(data)
            if (data.success == true) {
              this.getFeedsList(0, this.limit);
            } else {
              this.showLogoutAlert()
            }
          },
          (err) => this.showLogoutAlert()
          )


      })

  };//

  getFeedsList(id, limit) {

    id = 0 || this.lastObjectId;
    this._dataService.getAllFeeds(id, limit)
      .subscribe(
      (data) => {
        console.log(data);
        if (data.success == false) {
          this.showErrorAlertController();
        } else {
          this.populateFeedsArray(data);
        }
      },
      (err) => this.showErrorAlertController()
      )
  };//


  populateFeedsArray(data) {

    // this.feedsArray.push(data.data);
    // this.feedsArray = _.flatten(this.feedsArray)
    // console.log(this.feedsArray)
    _.each(data.data,(value,index) => {
      this.feedsArray.push(value);
    })
    this.currentId = this.currentId + 1;

    let feedsArrayLen = this.feedsArray.length - 1;
    this.lastObjectId = this.feedsArray[feedsArrayLen]._id;


    console.log(this.lastObjectId);
  }


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

  showErrorAlertController(msg?: any) {

    const alert = this._alertController.create({
      title: 'Error',
      message: `There is an error. Please check your internet connection and try again! ${msg}`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

  };//

  fetchMoreFeeds(infiniteScroll) {

    this.getFeedsList(this.lastObjectId, this.limit)
    
    infiniteScroll.complete();

  }

  addComment(){
    this.navCtrl.push(AddCommentPage);
  }

}
