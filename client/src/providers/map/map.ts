import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import L from 'leaflet';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  map: any = null;

  constructor(public http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }

  getMap() {
    if (this.map === null) {
      console.log('map initialization');
      this.map = L.map('map').setView([41.0131, 28.9641], 18);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(this.map);
    }
    console.log(this.map);
    return this.map;
  }

}
