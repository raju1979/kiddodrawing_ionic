import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

declare var CryptoJS: any;

@Injectable()
export class DataService {

  myData: string = "x_#@dndfhj^%";

  baseExpressUrl = "http://localhost:5000/";
  // baseExpressUrl = "  https://kiddodrawing.herokuapp.com/";



  userData:any;


  constructor(private _http: Http, private _storage:Storage) {


  }

  genearateDataForLogin(data: any) {
    var encrypted = CryptoJS.AES.encrypt(data, this.myData);
    return encrypted;
  }

  getUsersList() {
    return this._http.get(`${this.baseExpressUrl}users`);
  }

  addUserData(data) {
    console.log(JSON.stringify(data));


    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.myData);
    console.log(ciphertext.toString())
    // // Decrypt 
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), this.myData);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    console.log(decryptedData);


    var formData = {
      data: encodeURIComponent(ciphertext.toString())
    }

    console.log(JSON.stringify(formData));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let successData = this._http.post(`${this.baseExpressUrl}user/register`, formData, { headers: headers }).map(res => res.json());;

    //.map((res: Response) => res.json())
    console.log(successData);
    return successData;
  }

  loginUser(data) {
    console.log(JSON.stringify(data));

    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.myData);
    var formData = {
      data: ciphertext.toString()
    }

    console.log(formData);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let successData = this._http.post(`${this.baseExpressUrl}user/login`, formData, { headers: headers }).map(res => res.json());;

    return successData;
  };//

  setUserDataOnLogin(data){
    this.userData = data;
    this._storage.set('userdata',data);
  }

  getAllUsersList(val){
    console.log(val);
    console.log(this.userData);

    var ciphertext = CryptoJS.AES.encrypt(val, this.myData);
    var encodedCipherText = encodeURIComponent(ciphertext.toString());
    

    var formData = {
      data: encodedCipherText
    }

    console.log(JSON.stringify(formData));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let successData = this._http.post(`${this.baseExpressUrl}user/getusers`, formData, { headers: headers }).map(res => res.json());;
    return successData;
  };//


  getUserPosts(val){

    let userStoreData:any = '';

    let userId = '';
    let token = '';

        userStoreData = JSON.parse(val);

        userId = userStoreData.id;
        token = userStoreData.token;

        console.log(token);

        let dataToSend  = {
          token:token,
          id:userId
        }
        
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataToSend), this.myData);
        let encodedCipherText = encodeURIComponent(ciphertext.toString());

        

        var formData = {
          data: encodedCipherText
        };

        console.log(JSON.stringify(formData));

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let successData = this._http.post(`${this.baseExpressUrl}user/getuserfeeds`, formData, { headers: headers }).map(res => res.json());;
        return successData;      

  };//

  addNewFeed(feedData) {
    //console.log(JSON.stringify(feedData));


    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(feedData), this.myData);
    //console.log(ciphertext.toString())
    // // Decrypt 
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), this.myData);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    //console.log(decryptedData);


    var formData = {
      data: encodeURIComponent(ciphertext.toString())
    }

    console.log(JSON.stringify(formData));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let successData = this._http.post(`${this.baseExpressUrl}feed/addfeed`, formData, { headers: headers }).map(res => res.json());;

    //.map((res: Response) => res.json())
    console.log(successData);
    return successData;
  };//

  validateToken(userSavedData){
    
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userSavedData), this.myData);

      // // Decrypt 
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), this.myData);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData)

      var formData = {
        data: encodeURIComponent(ciphertext.toString())
      }
  
      console.log(JSON.stringify(formData));
  
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');    

    let successData = this._http.post(`${this.baseExpressUrl}user/validatetoken`, formData, { headers: headers }).map(res => res.json());;
    
     return successData; 
  };//

  getAllFeeds(id,limit){

    var formData = {
      id: id,
      limit:limit
    }

    console.log(formData);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let successData = this._http.post(`${this.baseExpressUrl}feed/feedlist`,formData,{headers:headers}).map(res => res.json());
    return successData;
  }


};//