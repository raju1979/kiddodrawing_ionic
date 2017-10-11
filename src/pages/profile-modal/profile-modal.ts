import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';


@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModal {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
  }

  editAndClose(){
    this._viewCtrl.dismiss(
      "hello"
    )
  }

}
