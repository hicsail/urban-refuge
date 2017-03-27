import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import { GoogleMapComponent } from "../../components/google-map/google-map";
import { HttpService } from "../../providers/http-service";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('slider') slider:Slides;
  @ViewChild('map') map:GoogleMapComponent;
  public selectedResource = "";

  constructor(private navParams: NavParams, private http:HttpService) {
    this.selectedResource = navParams.data;
  }

  ionViewDidLoad(){
    this.getResource(this.selectedResource);
  }

  ionViewDidEnter(){
    if(this.selectedResource == 'Cash' || this.selectedResource == 'Health' || this.selectedResource == 'Other'){
      this.slider.slideNext();
    }
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
            info: marker,
            icon: this.getImageURL(marker.primaryType),
            draggable: false
          });
        }
        for(let marker of response.secondary){
          markers.push({
            lat: marker.latitude,
            lng: marker.longitude,
            info: marker,
            icon: this.getImageURL(marker.primaryType),
            draggable: false
          });
        }
        this.map.addMarkers(markers);
      }
    );
  }

  private getImageURL(type){
    return "assets/map/" + type.toLowerCase() + ".png";
  }
}
