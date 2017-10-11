import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

interface User {
  name: string; // required with minimum 5 characters
  email:string;
  password:string;
  location:string;
  dob;
}



@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  user: User; // our model

  userModel = {
    user_name:'',
    emailaddress:'',
    password:'',
    location:'',
    dob:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataService:DataService, private _alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

  addUser(){
    console.log(this.userModel);
  }

  save(model: User, isValid: boolean) {
    console.log(model, isValid);
    this._dataService.addUserData(model)
      .subscribe(
        (data) => {
          console.log(data)
          if(data.success == true){
            this.navCtrl.pop();
          }else{
            this.showFailAlert()
          }
        },
        (err) => this.showFailAlert()
      )
  }

  showFailAlert(){
    const alert = this._alertController.create({
      title: 'Error',
      subTitle: 'There is some error. Please check you network and try again',
      buttons: ['Dismiss']
    });
    alert.present();
  };//

  ngOnInit() {
    this.user = {
      name: '',
      email:'',
      password:'',
      location:'',
      dob:''
    };
  }

}
