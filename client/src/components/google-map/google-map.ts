import { Component } from '@angular/core';

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

    private markes:Array<Marker> = [];

    constructor() {}

    public removeAllMarkers() {
      this.markes = [];
    }

    public addMarkers(makers:Array<Marker>){
      this.markes = this.markes.concat(makers);
    }


  }
