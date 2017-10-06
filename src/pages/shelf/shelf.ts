import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Storage } from '@ionic/storage';

declare var cordova: any;

declare var PSPDFKit: any;

@Component({
  selector: 'page-shelf',
  templateUrl: 'shelf.html'
})
export class ShelfPage {
  myBooks: Array<any> = [];
  constructor(public navCtrl: NavController, private _dataService: DataService, private _storage: Storage) {



    // this.myBooks = [
    //   {
    //     package_id: 'xc3_Tu6',
    //     poster: "assets/packages/xc3_Tu6.jpg",
    //     title: "King , Merchant and the worker",
    //     title_hindi: "राजा व्यापारी और सेवक",
    //     author: "Vishnu Sharma",
    //     language: "Hindi",
    //     free: "yes"
    //   },
    //   {
    //     package_id: 'zen58h_2',
    //     poster: "assets/packages/zen58h_2.jpg",
    //     title: "The Foolish Sage & Swindler",
    //     title_hindi: "मूर्ख साधू और ठग",
    //     author: "Vishnu Sharma",
    //     language: "Hindi",
    //     free: "yes"
    //   }
    // ]
  };//

  viewPdf(book) {
    console.log(book);
    this.showFromAsset(book.package_id);

  }

  showFromAsset(package_id: string) {
    console.log(`${package_id}.pdf`);
    PSPDFKit.showDocumentFromAssets(`www/assets/packages/${package_id}.pdf`, {
      title: 'My PDF Document',
      page: 0,
      scrollDirection: PSPDFKit.PageScrollDirection.VERTICAL,
      scrollMode: PSPDFKit.ScrollMode.CONTINUOUS,
      useImmersiveMode: true
    }, this.showSuccess, this.showError);
  };//

  showSuccess() {
    console.log("show success");
  }

  showError() {
    console.log("show error");
  };//

  ngAfterViewInit() {

    this._storage.get("token").then((val) => {
      console.log(val);
      this._dataService.getBooksList(val)
        .subscribe(
          (response) => {
            console.log(response.json())
            let responseData = response.json();
            if(responseData.success == true){
              this.myBooks = responseData.data;
            }
          },
          (error) => {
            console.log(error);
          }
        )

    })


  };//

}
