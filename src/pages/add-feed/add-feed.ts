import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';

import { DataService } from '../../services/data.service';

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-feed',
  templateUrl: 'add-feed.html',
})
export class AddFeed {


  myform: FormGroup;
  createdBy: FormControl;
  imgBaseString: FormControl;
  feedTitle: FormControl;
  feedKeywords: FormControl;
  feedDescription: FormControl;
  userToken:FormControl;

  userData:any;

  imgString = "data:image/jpeg;base64,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"

  imgFromCameraString:string = '';

  options: CameraOptions = {
    quality: 50,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE
  }

  httpRequestGoing:boolean = false;

  constructor(private _platform:Platform,private _camera:Camera,private _alertController:AlertController,private _dataService: DataService,public navCtrl: NavController, public navParams: NavParams, private _storage: Storage) {

  }

  createFormControls() {
    this.createdBy = new FormControl('', Validators.required);
    this.imgBaseString = new FormControl('', Validators.required);
    this.feedTitle = new FormControl('', Validators.required);
    this.feedKeywords = new FormControl('', Validators.required);
    this.feedDescription = new FormControl('', Validators.required);
    this.userToken = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      createdBy: this.createdBy,
      imgBaseString: this.imgBaseString,
      feedTitle: this.feedTitle,
      feedKeywords: this.feedKeywords,
      feedDescription: this.feedDescription,
      userToken: this.userToken,
    });

    this.myform.get("imgBaseString").setValue(this.imgString);
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  ionViewDidLoad() {
    this._storage.get("userdata")
      .then((data) => {
        if (typeof data === "undefined" || data == null) {

        } else {
          console.log(data);
          this.userData = JSON.parse(data);
          this.myform.get("createdBy").setValue(this.userData.id);
          this.myform.get("userToken").setValue(this.userData.token);
        }
      })
  }

  submitFeed(){
    if(this.myform.valid){
      // console.log(JSON.stringify(this.myform.value));
      this.httpRequestGoing = true;
      let finalFeedData = this.myform.value;
      this._dataService.addNewFeed(this.myform.value)
        .subscribe(
          (feedReturnData) => {
            this.httpRequestGoing = false;
            console.log(feedReturnData);
            if(feedReturnData.success == true){
              this.showSuccessAlert();
            }else{
              this.showErrorAlert(feedReturnData.errorCode);
            }
          },
          (error) => {
            this.httpRequestGoing = false;
            this.showErrorAlert(error);
          }
        )
    }else{
      console.log("Invalid form")
    }
  };//

  showErrorAlert(errorCode?:any){

    let errorAlert = this._alertController.create({
      title: 'Error',
      subTitle: `There is some error. Please check your network connection and try again ${errorCode}`,
      buttons: ['Ok']
    });
    errorAlert.present();

  }

  showSuccessAlert(){
    let errorAlert = this._alertController.create({
      title: 'Yippee',
      subTitle: `Your new Feed is successfully saved`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            setTimeout(() => {
              this.navCtrl.pop();
            })            
          }
        }
      ]
    });
    errorAlert.present();
  }

  getPicture(){
    this._camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgFromCameraString = 'data:image/jpeg;base64,' + imageData;
      this.myform.get("imgBaseString").setValue(this.imgFromCameraString);
      console.log("camera done");
     }, (err) => {
      // Handle error
     });
  }

  getLoadingImg(){
    let loadingImg;
    if(this._platform.is("mobile")){
      loadingImg = "assets/img/loading.svg";
    }else{
      loadingImg = "../assets/img/loading.svg";
    }

    return loadingImg;

  };//

  getCameraImg(){
    return this.imgFromCameraString;
  }




}
