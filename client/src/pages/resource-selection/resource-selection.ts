import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'
import { HockeyApp } from 'ionic-hockeyapp';

@Component({
  selector: 'page-resource-selection',
  templateUrl: 'resource-selection.html'
})
export class ResourceSelectionPage {

  constructor(private navCtrl: NavController, private hockeyApp: HockeyApp) {
  }

  getResource(resource) {
    // open a map page
    this.navCtrl.push(MapPage, resource);
  }

  openWebsite() {
    this.hockeyApp.trackEvent("LAUNCHED_WEBSITE");
  }

}
