import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GoogleMapComponent} from "../../components/google-map/google-map";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild(GoogleMapComponent) map: GoogleMapComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.map.removeAllMarkers();
  }

}
