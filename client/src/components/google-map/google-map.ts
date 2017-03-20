import {Component, ViewChild} from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { ViewResourcePage } from '../../pages/view-resource/view-resource';
import { SebmGoogleMap } from "angular2-google-maps/core";

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

    @ViewChild('googleMap') map:SebmGoogleMap;
    public markers:Array<Marker> = [];
    public center = {lat: 31.8354533, lng: 35.6674418}; //defualt location
    public currentLocationMarker = {lat: 31.8354533, lng: 35.6674418,
      icon: 'assets/images/location.svg'}; //defualt location
    public trackCurrentLocation = false;

    constructor(private nav:NavController) {
      this.getLocation();
      let watch = Geolocation.watchPosition();
        watch.subscribe((resp) => {
          this.trackCurrentLocation = true;
          this.currentLocationMarker.lat = resp.coords.latitude;
          this.currentLocationMarker.lng = resp.coords.longitude;
       });
    }

    private getLocation() {
      Geolocation.getCurrentPosition().then((resp) => {
          this.trackCurrentLocation = true;
          this.currentLocationMarker.lat = resp.coords.latitude;
          this.currentLocationMarker.lng = resp.coords.longitude;
          this.center = {
            lat: this.currentLocationMarker.lat,
            lng: this.currentLocationMarker.lng
          };
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

    centerChange(latLng){
      this.center = latLng;
    }

  }
