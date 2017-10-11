import { Component } from '@angular/core';
import { NavController, AlertController,ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

import {MomentModule} from 'angular2-moment/moment.module';

import { ProfileModal } from '../profile-modal/profile-modal';



declare var cordova: any;

declare var _:any;

declare var PSPDFKit: any;

@Component({
  selector: 'page-shelf',
  templateUrl: 'shelf.html'
})
export class ShelfPage {

  feedsArray:Array<any> = [];

  constructor(public navCtrl: NavController, private _dataService: DataService, private _storage: Storage, private _alertController: AlertController,private _modalCtrl:ModalController) {

  };//



  ngAfterViewInit() {

    

  };//

  ionViewWillEnter(){
    setTimeout(() => {
      this.getUserFeeds();
    },1000)
    
  }


  getUsers() {
    this._storage.get("userdata").then((val) => {

      let userData = JSON.parse(val);
      console.log(userData);
      this._dataService.getAllUsersList(val)
        .subscribe(
        (response) => {
          console.log(response)
          if (response.reasonCode == 3) {
            console.log("Invalid user log him out");
            this.showLogoutAlert();
          }
        },
        (error) => {
          console.log(error);
        }
        )

    })
  };//

  getUserFeeds() {
    this._storage.get("userdata")
      .then((val) => {

        this._dataService.getUserPosts(val).subscribe(
          (response) => {
            console.log(response)
              console.log(response)             
              this.checkResponseForUserFeeds(response);
          }
        )

      })
      .catch((err => {
        this.showErrorAlertController("Server Error")
      }))



  };//

  checkResponseForUserFeeds(responseData){

    if(responseData.errorCode == 3){
      this.showLogoutAlert()
    }else if(responseData.errorCode == 4){

    }else{
      this.populateUserFeedsArray(responseData);
    }

  };//

  populateUserFeedsArray(responseData){
    this.feedsArray = responseData.data;
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

  showErrorAlertController(msg:any) {

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

  getImageBaseString(imgBaseString):string{
    let imgString = '';
    imgString = imgBaseString
    return imgString;
  }

  getStarAverage(feed):string{
    var feedCommentArray = feed.feedComment;

    let starsArray = [];

    _.forEach(feedCommentArray, function(value,index) {
      starsArray.push(parseInt(value.stars));
      
    });
    let starsAvg =_.mean(starsArray);
    return `${starsAvg}`;
  };//

  openProfileModal(){
    console.log("pppp")
    let profileModal = this._modalCtrl.create(ProfileModal, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      console.log(data);
      
    });
    profileModal.present();
  }

};//
