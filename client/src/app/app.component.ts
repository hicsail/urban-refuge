import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { HockeyApp } from "../providers/hockey-app";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ResourceSelectionPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,private hockeyApp:HockeyApp) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
        this.hockeyApp.start();
        this.hockeyApp.trackEvent("APP_OPEN");
        this.hockeyApp.checkHockeyAppUpdates();
      }
    });
  }
}
