import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage} from '../pages/map/map';
import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { ViewResourcePage } from '../pages/view-resource/view-resource';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from "ionic-cache";
import { FilterProvider } from '../providers/filter/filter';

import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ResourceSelectionPage,
    ViewResourcePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ResourceSelectionPage,
    ViewResourcePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilterProvider,
    EmailComposer
  ]
})
export class AppModule {}
