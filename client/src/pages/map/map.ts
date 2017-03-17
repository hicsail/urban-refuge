import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GoogleMapComponent } from "../../components/google-map/google-map";
import { HttpService } from "../../providers/http-service";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') map:GoogleMapComponent;
  public selectedResource = "";

  constructor(private navParams: NavParams, private http:HttpService) {
    this.selectedResource = navParams.data;
  }

  getResource(resource){
    this.map.removeAllMarkers();
    this.selectedResource = resource;
    this.http.getReasource(this.selectedResource).subscribe(
      response => {
        let markers = [];
        for(let marker of response.primary){
          markers.push({
            lat: marker.latitude,
            lng: marker.longitude,
            draggable: false
          });
        }
        for(let marker of response.secondary){
          markers.push({
            lat: marker.latitude,
            lng: marker.longitude,
            draggable: false
          });
        }
        this.map.addMarkers(markers);
      }
    );
  }
}
