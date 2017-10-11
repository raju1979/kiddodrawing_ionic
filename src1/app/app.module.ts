import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { File } from '@ionic-native/file';
import { ShelfPage } from '../pages/shelf/shelf';

import { HttpModule } from '@angular/http';
import { DataService } from '../services/data.service';
import { AdduserPage } from '../pages/adduser/adduser';

import { IonicStorageModule } from '@ionic/storage';

import { MomentModule } from 'angular2-moment';
import { AddFeed } from '../pages/add-feed/add-feed';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfilePage } from '../pages/profile/profile';
import { AddCommentPage } from '../pages/add-comment/add-comment';
import { CameraModal } from '../pages/camera-modal/camera-modal';
import { ProfileModal } from '../pages/profile-modal/profile-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ShelfPage,
    AdduserPage,
    AddFeed,
    ProfilePage,
    AddCommentPage,
    CameraModal,
    ProfileModal
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ShelfPage,
    AdduserPage,
    AddFeed,
    ProfilePage,
    AddCommentPage,
    CameraModal,
    ProfileModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,DataService,Camera
  ]
})
export class AppModule {}
