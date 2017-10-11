import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import moment from 'moment';
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {
  commentsList: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.commentsList = [
      {
        createdBy: 'Lucky Kashyap',
        createdOn: '2017-10-05',
        content: 'This is great!!!'
      },
      {
        createdBy: 'Kumar Lucky',
        createdOn: '2017-10-06',
        content: 'thanks!!!'
      },
      {
        createdBy: 'Lucky Kashyap',
        createdOn: '2017-10-05',
        content: 'This is great!!!'
      },
      {
        createdBy: 'Kumar Lucky',
        createdOn: '2017-10-06',
        content: 'thanks!!!'
      },
      {
        createdBy: 'Lucky Kashyap',
        createdOn: '2017-10-05',
        content: 'This is great!!!'
      },
      {
        createdBy: 'Kumar Lucky',
        createdOn: '2017-10-06',
        content: 'thanks!!!'
      },
      {
        createdBy: 'Lucky Kashyap',
        createdOn: '2017-10-05',
        content: 'This is great!!!'
      },
      {
        createdBy: 'Kumar Lucky',
        createdOn: '2017-10-06',
        content: 'thanks!!!'
      },
      {
        createdBy: 'Lucky Kashyap',
        createdOn: '2017-10-05',
        content: 'This is great!!!'
      },
      {
        createdBy: 'Kumar Lucky',
        createdOn: '2017-10-06',
        content: 'thanks!!!'
      }
    ]
  }
  getTime(time){
    return moment(time).startOf('day').fromNow();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCommentPage');
  }

}
