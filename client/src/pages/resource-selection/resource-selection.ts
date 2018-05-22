import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'

@Component({
  selector: 'page-resource-selection',
  templateUrl: 'resource-selection.html'
})
export class ResourceSelectionPage {

  constructor(public navCtrl: NavController) {}

  getResource(resource) {
    this.navCtrl.push(MapPage, resource);
  }

}
