import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { ViewResourcePage } from '../../pages/view-resource/view-resource';

  interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    icon?: string;
  }

  @Component({
    selector: 'google-map',
    templateUrl: 'google-map.html'
  })
  export class GoogleMapComponent {

    public markers:Array<Marker> = [];
    public center = {lat: 31.8354533, lng: 35.6674418}; //defualt location
    public currentLocationMarker = {lat: 31.8354533, lng: 35.6674418,
      icon: 'assets/images/location.svg'}; //defualt location
    public trackCurrentLocation = true;

    constructor(private nav:NavController) {
      this.recenterMap();
      let watch = Geolocation.watchPosition();
        watch.subscribe((resp) => {
          this.currentLocationMarker.lat = resp.coords.latitude;
          this.currentLocationMarker.lng = resp.coords.longitude;
       });
    }

    private getLocation() {
      Geolocation.getCurrentPosition().then((resp) => {
          this.currentLocationMarker.lat = resp.coords.latitude;
          this.currentLocationMarker.lng = resp.coords.longitude;
      }).catch((error) => {
        this.trackCurrentLocation = false;
      });
    }

    public recenterMap() {
      this.center = {
        lat: this.currentLocationMarker.lat,
        lng: this.currentLocationMarker.lng
      };
    }

    public removeAllMarkers() {
      this.markers = [];
    }

    public addMarkers(markers:Array<Marker>) {
      this.markers = this.markers.concat(markers);
    }

    public openResource(resource){
      this.nav.push(ViewResourcePage,resource);
    }

  }
