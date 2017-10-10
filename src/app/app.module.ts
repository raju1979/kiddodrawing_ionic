import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
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
import { FeedsList } from '../pages/feeds-list/feeds-list';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfilePage } from '../pages/profile/profile';
import { AddCommentPage } from '../pages/add-comment/add-comment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ShelfPage,
    AdduserPage,
    AddFeed,
    FeedsList,
    ProfilePage,
    AddCommentPage
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
    ListPage,
    LoginPage,
    ShelfPage,
    AdduserPage,
    AddFeed,
    FeedsList,
    ProfilePage,
    AddCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,DataService,Camera
  ]
})
export class AppModule {}
