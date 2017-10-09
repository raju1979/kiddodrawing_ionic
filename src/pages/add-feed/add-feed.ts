import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

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

  imgString = "data:image/png;base64,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";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage) {

  }

  createFormControls() {
    this.createdBy = new FormControl('', Validators.required);
    this.imgBaseString = new FormControl('', Validators.required);
    this.feedTitle = new FormControl('', Validators.required);
    this.feedKeywords = new FormControl('', Validators.required);
    this.feedDescription = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      createdBy: this.createdBy,
      imgBaseString: this.imgBaseString,
      feedTitle: this.feedTitle,
      feedKeywords: this.feedKeywords,
      feedDescription: this.feedDescription,
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
          let useData = JSON.parse(data);
          this.myform.get("createdBy").setValue(useData.id);
        }
      })
  }

  submitFeed(){
    if(this.myform.valid){
      console.log("valid form");
      console.log(JSON.stringify(this.myform.value));
    }else{
      console.log("Invalid form")
    }
  }


}
