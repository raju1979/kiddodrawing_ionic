import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataService:DataService) {
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
          if(data.success == "done"){
            console.log(data);
            this.navCtrl.pop();
          }
        },
        (err) => console.log(err)
      )
  }

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
