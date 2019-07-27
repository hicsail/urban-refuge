import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { CacheService } from "ionic-cache";
import { HockeyApp } from 'ionic-hockeyapp';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = ResourceSelectionPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, app:App, hockeyApp:HockeyApp) {
    platform.ready().then(() => {
      // set android id
      let androidAppId = '';
      // set ios id
      let iosAppId = '';
      let autoSendCrashReports = false;
      let ignoreCrashDialog = true;
      hockeyApp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);
      hockeyApp.trackEvent('App launched');
      platform.registerBackButtonAction(() => {
        let nav = app.getRootNav();
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          nav.setRoot(this.rootPage);
        }
      });
      cache.setDefaultTTL(60 * 60 * 24);
      cache.setOfflineInvalidate(false);
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

}
