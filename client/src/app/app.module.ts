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
import { HockeyApp } from 'ionic-hockeyapp';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms'
import { Geolocation } from '@ionic-native/geolocation';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    EmailComposer,
    HockeyApp,
    CallNumber,
    SMS,
    Geolocation,
    InAppBrowser
  ]
})
export class AppModule {}
