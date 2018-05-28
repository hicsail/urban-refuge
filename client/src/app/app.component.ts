import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { CacheService } from "ionic-cache";

import { HockeyApp } from 'ionic-hockeyapp';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ResourceSelectionPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    private cache: CacheService, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public app: App,
    private hockeyapp: HockeyApp)
     {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.cache.setDefaultTTL(60 * 60 * 24);
      this.cache.setOfflineInvalidate(false);

      // The Android ID of the app as provided by the HockeyApp portal. Can be null if for iOS only.
      let androidAppId = '';
      // The iOS ID of the app as provided by the HockeyApp portal. Can be null if for android only.
      let iosAppId = '';
      // Specifies whether you would like crash reports to be automatically sent to the HockeyApp server when the end user restarts the app.
      let autoSendCrashReports = false;
      // Specifies whether you would like to display the standard dialog when the app is about to crash. This parameter is only relevant on Android.
      let ignoreCrashDialog = true;
  
      this.hockeyapp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);
  
      //So app doesn't close when hockey app activities close
      //This also has a side effect of unable to close the app when on the rootPage and using the back button.
      //Back button will perform as normal on other pages and pop to the previous page.
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getRootNav();
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          nav.setRoot(this.rootPage);
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
