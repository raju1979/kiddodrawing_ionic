import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { DataService } from '../../services/data.service';

declare var cordova: any;

declare var PSPDFKit:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mainDirectoryName: string = "Download";
  fs: string;	

  constructor(public navCtrl: NavController, private _file:File, private platform:Platform, private _alertCtrl:AlertController,private _dataService:DataService) {
  		
      

      
      

  		
  };//

  //check if folder cbsapp exists
  checkPrimaryFolder() {
    //this.fs = cordova.file.dataDirectory;
    this._file.checkDir(this.fs, this.mainDirectoryName).
      then(_ => this.showSuccessAlert("Folder found"))
      .catch(err => this.showFailureAlert('Folder not found'));
  };//

  showSuccessAlert(msg:string){
  	const alertSuccess = this._alertCtrl.create({
      title: `Success!`,
      subTitle: `Success ${msg}`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
            this.showMyDocument();
          }
        }
      ]
    });

    alertSuccess.present();
    
  }

  showFailureAlert(msg:string){
  	const alertFailure = this._alertCtrl.create({
      title: `Fail!`,
      subTitle: `Fail ${msg}`,
      buttons: ['Ok']
    });

    alertFailure.present();
  }

  showMyDocument() {
  	// let path = this.fs+this.mainDirectoryName+"/sample.pdf";
  	let path = this.fs+ this.mainDirectoryName + "/sample.pdf";

  	console.log(PSPDFKit);
  	console.log(path);

    this._file.createDir(this.fs, this.mainDirectoryName + "/" + "appdata", true)
      // .then(() => this.downloadPackageFile(id))
      .then(() => {
        PSPDFKit.showDocument(path, 'abcd@1234',{
          title: 'My PDF Document',
          page: 0,
          scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
          scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
          useImmersiveMode: true
        }, this.showSuccess, this.showError)
      })
      .catch((err) => console.log(err))
 
	
	

	// PSPDFKit.showDocument(path, {
	// 	title: 'My PDF Document',
	// 	page: 4,
	// 	scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
	// 	scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
	// 	useImmersiveMode: true
	// }, this.showSuccess, this.showError)
  }

  showFromSdCardNoPass(){
    this.fs = this._file.externalRootDirectory;
    let path = this.fs+ this.mainDirectoryName + "/faq.pdf";

    console.log(path);

    this._file.createDir(this.fs, this.mainDirectoryName + "/" + "appdata", true)
      // .then(() => this.downloadPackageFile(id))
      .then(() => {
        PSPDFKit.showDocument(path, {
          title: 'My PDF Document',
          page: 0,
          scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
          scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
          useImmersiveMode: true
        }, this.showSuccess, this.showError)
      })
      .catch((err) => console.log(err))

        

  }

  showFromAsset(){
    PSPDFKit.showDocumentFromAssets('www/assets/sample.pdf', {
      title: 'My PDF Document',
      page: 4,
      scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
      scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
      useImmersiveMode: true
    },this.showSuccess,this.showError);
  };//

  showFromAsset2(){
    PSPDFKit.showDocumentFromAssets('www/sample.pdf', {
      title: 'My PDF Document',
      page: 4,
      scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
      scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
      useImmersiveMode: true
    },this.showSuccess,this.showError);
  };//

  showFromSdCard(){
    this.platform.ready().then(() => {
        console.log(this._file);
        this.fs = this._file.externalRootDirectory;
        console.log(this.fs);
        if (this.platform.is('mobile')) {
          this.checkPrimaryFolder();
        }
      })
  }

  showSuccess(){
  	console.log("show success");
  }

  showError(){
  	console.log("show error");
  }

  

}
