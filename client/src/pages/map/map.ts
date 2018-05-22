import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import L from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('slider') slider:Slides;
  public selectedResource = "";
  map: any;

  constructor(public navParams: NavParams) {
    this.selectedResource = navParams.data;
  }

  ionViewDidLoad() {
    this.getResource(this.selectedResource);
  }

  ionViewDidEnter() {
    this.map = L.map('map').setView([41.0131, 28.9641], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);
    if (this.selectedResource == 'Cash' || this.selectedResource == 'Health' || this.selectedResource == 'Other') {
      this.slider.slideNext();
    }
  }

  getResource(resource) {
    this.selectedResource = resource;
  }

  // private getImageURL(type) { 
  //   return "assets/map/" + type.toLowerCase() + ".png";
  // }
}
