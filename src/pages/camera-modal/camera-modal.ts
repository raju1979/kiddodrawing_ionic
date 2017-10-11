import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

declare var Webcam:any;


@Component({
  selector: 'page-camera-modal',
  templateUrl: 'camera-modal.html',
})
export class CameraModal{

  @ViewChild("my_camera") myCamera:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModalPage');
  }

  ngAfterViewInit(){
    console.log(this.myCamera.nativeElement);

    Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 50
		});
    Webcam.attach( this.myCamera.nativeElement );
    

  }

  takeSnap(){

    Webcam.snap( (data_uri) => {
      // display results in page
      console.log(data_uri);
      let returnData = {img_data_uri:data_uri};
      setTimeout(() => {
        this.viewCtrl.dismiss(returnData)
      })
    });

  }

}
