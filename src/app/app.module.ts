import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire'; 
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {AuthServiceService} from '../app/servicios/auth-service.service';
import {StorageService} from '../app/servicios/storage.service';
import {BdaService} from '../app/servicios/bda.service'

import { Camera } from '@ionic-native/camera/ngx';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule],
  providers: [
    StatusBar,
    AngularFireAuth,
    StorageService,
    SplashScreen,
    DatePipe,
    Camera,
    BdaService,
    AuthServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
