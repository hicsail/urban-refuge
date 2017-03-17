import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';

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
    public center = {lat: 32.2934514, lng: 36.3276718};
    public currentLocationMarker = {lat: 32.2934514, lng: 36.3276718,
      icon: 'assets/images/location.svg'};
    public trackCurrentLocation = true;

    constructor() {
      this.recenterMap();
      setInterval(() => {this.getLocation();},10000);
    }

    private getLocation() {
      Geolocation.getCurrentPosition().then((resp) => {
        if(this.trackCurrentLocation){
          this.currentLocationMarker.lat = resp.coords.latitude;
          this.currentLocationMarker.lng = resp.coords.longitude;
        }
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

    public recenterMap(){
      this.trackCurrentLocation = true;
      Geolocation.getCurrentPosition().then((resp) => {
        this.center.lat = resp.coords.latitude;
        this.center.lng = resp.coords.longitude;
        this.currentLocationMarker.lat = resp.coords.latitude;
        this.currentLocationMarker.lng = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

    public removeAllMarkers() {
      this.markers = [];
    }

    public addMarkers(markers:Array<Marker>) {
      this.markers = this.markers.concat(markers);
    }

  }
