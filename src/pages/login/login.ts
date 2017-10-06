import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShelfPage } from '../shelf/shelf';
import { DataService } from '../../services/data.service';
import { AdduserPage } from '../adduser/adduser';

import { Storage } from '@ionic/storage';

interface User {
  email:string;
  password:string;
}


declare var CryptoJS:any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrationString:string;

  user: User; // our model

  userData = {
    email:"sdfsdf",
    password:"asfsad"
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, private _navCtrl:NavController, private _dataService:DataService, private _toastCtrl:ToastController, private _storage:Storage) {
    this.registrationString = this._dataService.genearateDataForLogin("I am rajesh");
    console.log(this.registrationString.toString());

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(model: User, isValid: boolean){
    console.log(model,isValid);
    if(isValid){
      this._dataService.loginUser(model)
        .subscribe(
          (serviceData) =>{
            console.log(serviceData)
            if(serviceData.success == "true"){
              this.userSuccessfullyValidated(serviceData.data,serviceData.token);
            }else{
              console.log(serviceData.reason)
            }
          },
          (err) => console.log(err)
        )
    }
    // this.navCtrl.setRoot(ShelfPage);
  };//

  userSuccessfullyValidated(userData:any,token:any){
    this._storage.set("token",token);
    console.log(userData)
    let toast = this._toastCtrl.create({
      message: 'Login Successfull',
      duration: 3000
    });
    toast.onDidDismiss(() => {
      this._dataService.setUserDataOnLogin(userData);
      this.navCtrl.push(ShelfPage)
    });
    toast.present();
    
  }

  gotoAddUserPage(){
    this.navCtrl.push(AdduserPage);
  }

  ngOnInit() {
    this.user = {
      email:'',
      password:''
    };
  }

}
