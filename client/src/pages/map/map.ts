import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides, NavController } from 'ionic-angular';
import { FilterProvider } from '../../providers/filter/filter';
import { ViewResourcePage } from '../view-resource/view-resource';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import L from 'leaflet'
import 'leaflet.markercluster';
import $ from 'jquery';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('slider') slider: Slides;
  selectedResource: string = '';
  map: any = null;
  markers: any = null;
  trackCurrentLocation: boolean = false;
  currentLocationMarker: any = null;
  location: any = null;

  constructor(private filterProvider: FilterProvider, public navParams: NavParams, public navCtrl: NavController, private geolocation: Geolocation) {
    // assigning user selected filter
    this.selectedResource = navParams.data;
  }

  ionViewDidLoad() {
    // creating icon for the current position
    var geoIcon = L.icon({
      iconUrl: 'assets/images/location.svg',
      iconAnchor: [20, 20]
    });
    // setting the initial view to Istanbul
    this.map = L.map('map').setView([41.0131, 28.9641], 18);
    // creating OSM HOT Layer and adding on top of the map
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);
    // getting the location and subscribing to it
    this.geolocation.watchPosition().filter((p) => p.coords !== undefined).subscribe(position => {
      // stopping the spinner on the location button
      this.trackCurrentLocation = true;
      // removing the previous location
      if (this.currentLocationMarker != null) {
        this.map.removeLayer(this.currentLocationMarker);
      }
      // saving the current location
      this.location = new L.LatLng(position.coords.latitude, position.coords.longitude);
      // creating marker and adding to the map
      this.currentLocationMarker = L.marker(this.location, {
        icon: geoIcon
      }).addTo(this.map);
    });
    // creating marker cluster group
    this.markers = L.markerClusterGroup({
      // the options for spider leg. Color, weight or opacity can be changed
      spiderLegPolylineOptions: {
        weight: 1.5,
        color: '#0F144C',
        opacity: .5
      },
      // set options for polygon on hover
      polygonOptions: {
        fillColor: '#42C6A0',
        color: '#0F144C',
        weight: 1.5,
        opacity: 1,
        fillOpacity: .5
      }
    });
    // sending the resource selected
    this.getResource(this.selectedResource);
  }

  ionViewDidEnter() {
    if (this.selectedResource == 'Cash' || this.selectedResource == 'Health' || this.selectedResource == 'Other') {
      this.slider.slideNext();
    }
  }

  getResource(resource) {
    // assigning the selected resource
    this.selectedResource = resource;
    // clear the current layer
    this.markers.clearLayers();
    // subscribing to the data for the selected filter
    this.filterProvider.getData(resource).subscribe(data => {
      // creating icon for the selected filter
      var mIcon = L.icon({
        iconUrl: 'assets/map/' + resource.toLowerCase() +'.png',
        // to properly center the icons
        iconAnchor: [20, 20]
      });
      // looping through the nodes and creating markers and adding to the markers cluster
      data.elements.forEach(element => {
        var elementName = '';
        // if there English name of the node, then we assign it
        if (element.tags['name:en']) {
          elementName = element.tags['name:en'];
          // if there is no English name, then we try to get any name written in name key
        } else if(element.tags.name) {
          elementName = element.tags.name;
        }
        // if there exists Arabic name, then we assing it as well
        var elementArName = '';
        if (element.tags['name:ar']) {
          elementArName = element.tags['name:ar'];
        }
        // creating layer, binding popup when the button is pressed and adding to the markers cluster
        this.markers.addLayer(L.marker(L.latLng(element.lat, element.lon), {
          // usage of the above created icon
          icon: mIcon
        }).bindPopup('<h6>' + elementName + '</h6><h6 style="display: block; text-align: right">' + elementArName + '</h6><button class="openViewResoucePage" style="background-color: #42C6A0; color: white; height: 25px; border-radius: 4px; font-weight: 700; text-align: center; margin: 0 auto; display: block;">LEARN MORE</button>')
          .on('click', () => {
            // center the popup
            this.map.panTo(new L.LatLng(element.lat, element.lon));
          })
          .on('popupopen', () => {
            // this is the only solution that I thought of. Here, it is being waited until a new popup is fully loaded, then the event is attached to the button
            $(".openViewResoucePage").click(() => {
              // creating a key img and assining resource name to it, so we can use it in the next page
              element.tags.img = resource;
              // opening ViewResouce page and sending all the information about the node
              this.navCtrl.push(ViewResourcePage, element.tags);
            });
          }));
      });
      // add all markers on top of the map as a layer
      this.map.addLayer(this.markers);
    });
  }

  recenterMap() {
    // locate the user to the located place
    if (this.location !== null) {
      // center the current location
      this.map.panTo(this.location);
    }
  }

}