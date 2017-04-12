import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'
import {HockeyApp} from "../../providers/hockey-app";

@Component({
  selector: 'page-resource-selection',
  templateUrl: 'resource-selection.html'
})
export class ResourceSelectionPage {

  constructor(private nav: NavController, private hockeyApp:HockeyApp) {}

  getResource(resource){
    this.nav.push(MapPage,resource);
  }

  openWebsite(){
    this.hockeyApp.trackEvent("LAUNCHED_WEBSITE");
  }

}
