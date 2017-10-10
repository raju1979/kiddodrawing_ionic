import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  photoList: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.photoList = [
      {
        "imageData":"../assets/img/1.jpg",
        "createdBy": {
          "name":"Lucky Kashyap",
          "snap":"../assets/img/user3.jpg"
        },
        "createdOn":"2017-10-07"
      },
      {
        "imageData":"../assets/img/2.jpg",
        "createdBy": {
          "name":"Lucky Kashyap",
          "snap":"../assets/img/user2.jpg"
        },
        "createdOn":"2017-10-06"
      },
      {
        "imageData":"../assets/img/3.jpg",
        "createdBy": {
          "name":"Lucky Kashyap",
          "snap":"../assets/img/user2.jpg"
        },
        "createdOn":"2017-10-05"
      },
      {
        "imageData":"../assets/img/4.jpg",
        "createdBy": {
          "name":"Lucky Kashyap",
          "snap":"../assets/img/user1.jpg"
        },
        "createdOn":"2017-10-04"
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
