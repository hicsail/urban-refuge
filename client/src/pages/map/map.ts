import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('slider') slider:Slides;
  public selectedResource = "";

  constructor(public navParams: NavParams) {
    this.selectedResource = navParams.data;
  }

  ionViewDidLoad() {
    this.getResource(this.selectedResource);
  }

  ionViewDidEnter() {
    if (this.selectedResource == 'Cash' || this.selectedResource == 'Health' || this.selectedResource == 'Other'){
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
