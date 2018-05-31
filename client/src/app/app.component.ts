import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { CacheService } from "ionic-cache";

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
    public splashScreen: SplashScreen
  )
     {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.cache.setDefaultTTL(60 * 60 * 24);
      this.cache.setOfflineInvalidate(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
