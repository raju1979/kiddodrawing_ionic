import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController,MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShelfPage } from '../shelf/shelf';
import { DataService } from '../../services/data.service';
import { AdduserPage } from '../adduser/adduser';

import { Storage } from '@ionic/storage';

interface User {
  email: string;
  password: string;
}


declare var CryptoJS: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrationString: string;

  user: User; // our model

  myData: string = "x_#@dndfhj^%";

  userData = {
    email: "sdfsdf",
    password: "asfsad"
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, private _navCtrl: NavController, private _dataService: DataService, private _toastCtrl: ToastController, private _storage: Storage, private _alertController:AlertController, private _menuCtrl:MenuController) {
    this.registrationString = this._dataService.genearateDataForLogin("I am rajesh");
    console.log(this.registrationString.toString());


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(model: User, isValid: boolean) {
    console.log(model, isValid);
    if (isValid) {
      this._dataService.loginUser(model)
        .subscribe(
        (serviceData) => {
          console.log(serviceData)
          if (serviceData.success == true) {
            this.userSuccessfullyValidated(serviceData.data);
          } else {
            console.log(serviceData.reason)
          }
        },
        (err) => this.showErrorAlertController()
        )
    }
    // this.navCtrl.setRoot(ShelfPage);
  };//


  userSuccessfullyValidated(userData: any) {
    console.log(userData);
    var uri_dec = decodeURIComponent(userData);
    console.log(uri_dec);
    // Decrypt 
    var bytes = CryptoJS.AES.decrypt(uri_dec, this.myData);
    var decryptedData = (bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData);


    let toast = this._toastCtrl.create({
      message: 'Login Successfull',
      duration: 2000
    });
    toast.onDidDismiss(() => {
      this._dataService.setUserDataOnLogin(decryptedData);
      this.navCtrl.setRoot(ShelfPage)
    });
    toast.present();

  }

  showErrorAlertController() {

    const alert = this._alertController.create({
      title: 'Error',
      message: 'There is an error. Please check your internet connection and try again!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

  }

  gotoAddUserPage() {
    this.navCtrl.push(AdduserPage);
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    };
  };//

  ngAfterViewInit(){

    let userData = this._storage.get("userdata")
      .then((data) => {
        console.log(data)
        if(typeof data === "undefined" || data == null){

        }else{
          this.navCtrl.setRoot(ShelfPage);
        }
        
      })

  };//

  ionViewWillEnter(){
    this._menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    this._menuCtrl.enable(true);
  }

}
