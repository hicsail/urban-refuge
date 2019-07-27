import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'
import { HockeyApp } from 'ionic-hockeyapp';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-resource-selection',
  templateUrl: 'resource-selection.html'
})
export class ResourceSelectionPage {

  constructor(private navCtrl: NavController, private hockeyApp: HockeyApp, private iab: InAppBrowser) {
  }

  public getResource(resource) {
    // open a map page
    this.navCtrl.push(MapPage, resource);
  }

  public openWebsite() {
    // open urban refuge website
    const browser = this.iab.create('http://www.urbanrefuge.org', '_self', {
      zoom: 'no'
    });
    this.hockeyApp.trackEvent("LAUNCHED_WEBSITE");
  }

}
