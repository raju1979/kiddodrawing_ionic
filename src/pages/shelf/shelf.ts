import { Component } from '@angular/core';
import { NavController, AlertController,ModalController,Platform } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

import { CameraModal } from '../camera-modal/camera-modal';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {MomentModule} from 'angular2-moment/moment.module';



declare var cordova: any;

declare var _:any;

declare var PSPDFKit: any;



@Component({
  selector: 'page-shelf',
  templateUrl: 'shelf.html'
})
export class ShelfPage {

  feedsArray:Array<any> = [];

  userData:any;

  options: CameraOptions = {
    quality: 50,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE
  }

  imgAvatarString = "data:image/png;base64,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";

  constructor(private _camera:Camera,private _platform:Platform,public navCtrl: NavController, private _dataService: DataService, private _storage: Storage, private _alertController: AlertController,private _modalCtrl:ModalController) {

  };//



  ngAfterViewInit() {

    

  };//

  ionViewWillEnter(){
    setTimeout(() => {
      this.getUserFeeds();
    },1000)
    
  }


  getUserFeeds() {
    this._storage.get("userdata")
      .then((val) => {
        this.userData = JSON.parse(val);
        console.log(this.userData)
        if(_.has(this.userData,'avatarImg')){
          this.imgAvatarString = this.userData.avatarImg;
        }
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
    if(feedCommentArray.length == 0){
      return `0`;
    } else{
      return `${starsAvg}`;
    }
  };//

  getPicture(){
    if(this._platform.is("mobile")){
      this._camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.imgAvatarString = 'data:image/jpeg;base64,' + imageData;
        console.log("camera done");
       }, (err) => {
        // Handle error
       });
    }else{
      let cameraModal = this._modalCtrl.create(CameraModal, { userId: 8675309 });
      cameraModal.onDidDismiss(data => {
        this.imgAvatarString = data.img_data_uri;
        this.updateAvatarImg(this.imgAvatarString);
      });
      cameraModal.present();
    }
    
  }//

  updateAvatarImg(imgBase64){

    var userId = this.userData.id;

    let daaForAvatarRequest = {
      id:userId,
      imgBase64:imgBase64
    }

    this._dataService.addAvatarImg(daaForAvatarRequest)
      .subscribe(
        (data) => {
          this.analyzeResponse(data);
        },
        (err) => {
          console.log(err)
        }
      )

  };//

  analyzeResponse(returnedData){

    if(returnedData.success == false){
      this.showErrorAlertController(returnedData.errorCodes);
    }else{
      this.updateLocalStorageWithImg(returnedData.data)
    }

  };//

  updateLocalStorageWithImg(returnedData){

    console.log(this.userData);

    this.userData['avatarImg'] = returnedData.avatarImg;

    this._storage.set("userdata",JSON.stringify(this.userData));


  }






};//
