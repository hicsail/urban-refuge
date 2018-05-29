import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides } from 'ionic-angular';
import L from 'leaflet';
// import $ from 'jquery';
import osmtogeojson from 'osmtogeojson';
import { FilterProvider } from '../../providers/filter/filter';
import { MapProvider } from '../../providers/map/map';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('slider') slider: Slides;
  selectedResource: string = '';
  map: any = null;
  // searchArea: string;
  // features = [];
  // myQuery: string;

  // icon: any = null;

  constructor(private filterProvider: FilterProvider, public navParams: NavParams, private mapProvider: MapProvider) {
    this.selectedResource = navParams.data;
    // this.searchArea = '3600223474';
  }

  ionViewDidLoad() {
    // this.getResource(this.selectedResource);
    // console.log('ionViewDidLoad');

    // this.icon = this.getIcon(this.selectedResource);

    this.map = L.map('map').setView([41.0131, 28.9641], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    var resource = this.selectedResource.toLowerCase();

    this.filterProvider.getData(this.selectedResource).subscribe(data => {
      L.geoJSON(osmtogeojson(data), {
        style: function(feature) {          
            // return {color: feature.properties.color};
            return {
              color: "#0288D1"
            };
        },
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: 'assets/map/' + resource +'.png'
            })
          });
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup(JSON.stringify(feature.properties));
        }
      }).addTo(this.map);
    });
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter');
    
  }

  ionViewDidEnter() {
    // console.log('ionViewDidEnter');
    // this.getResource(this.selectedResource);
  }

  ionViewWillLeave() {
    // console.log('ionViewWillLeave');
    
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
    // this.map = null;
    // this.selectedResource = null;
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }

  // getIcon(icon) {
  //   return L.icon({
  //     iconUrl: 'https://openclipart.org/download/292749/abstract-icon.svg'
  //     // iconUrl: 'assets/map/education.png'
  //     // iconUrl: 'assets/map/' + icon.toLowerCase() +'.png'
  //   });
  // }

  getResource(resource) {

    // if (this.geoJSONLayer !== null) {
    //   console.log('clear');
    //   this.geoJSONLayer.clearLayers();
    // }

    // this.filterProvider.getData(resource).subscribe(data => {
    //   if (this.map !== null) {
    //     L.geoJSON(osmtogeojson(data), {
    //       style: function(feature) {
    //           // return {color: feature.properties.color};
    //           return {
    //             color: "#0288D1"
    //           };
    //       },
    //       pointToLayer: function(feature, latlng) {
    //         return L.marker(latlng, {
    //           icon: L.icon({
    //             iconUrl: 'assets/map/' + resource.toLowerCase() +'.png'
    //           })
    //         });
    //       },
    //       onEachFeature: function(feature, layer) {
    //         layer.bindPopup(JSON.stringify(feature.properties));
    //       }
    //     }).addTo(this.map);
    //   }
    // });
    // this.filterProvider.educationData
    
    // this.selectedResource = resource;
    // this.myQuery = '';
    // this.features = [];
  
    // if (this.geoJSONLayer !== null) {
    //   this.geoJSONLayer.clearLayers();
    // }
  
    //   if (resource === 'Education') {
    //     this.features.push({
    //       key: 'amenity',
    //       value: 'college|kindergarten|library|archive|public_bookcase|school|music_school|driving_school|university|research_institute'
    //     });
    //     this.features.push({
    //       key: 'building',
    //       value: 'university'
    //     });
    //   } else if(resource === 'Housing') {
    //     this.features.push({
    //       key: 'amenity',
    //       value: 'shelter'
    //     });
    //     this.features.push({
    //       key: 'building',
    //       value: 'apartments|dormitory'
    //     });
    //   } else if(resource === 'Health') {
    //     this.features.push({
    //       key: 'amenity',
    //       value: 'baby_hatch|clinic|dentist|doctors|hospital|nursing_home|pharmacy|social_facility|veterinary|'
    //     });
    //     this.features.push({
    //       key: 'healthcare',
    //       value: 'blood_donation'
    //     });
    //     this.features.push({
    //       key: 'building',
    //       value: 'hospital'
    //     });
    //     this.features.push({
    //       key: 'shop',
    //       value: 'medical_supply|nutrition_supplements'
    //     });
    //   } else if(resource === 'Work') {
    //     this.features.push({
    //       key: 'office',
    //       value: 'employment_agency|government'
    //     });
    //   } else if(resource === 'cash-assistance') {
    //     this.features.push({
    //       key: 'office',
    //       value: 'charity|ngo'
    //     });
    //   } else if(resource === 'Other') {
    //     this.features.push({
    //       key: 'amenity',
    //       value: 'community_centre|social_centre|courthouse|embassy|internet_cafe|place_of_worship|police|post_office|'
    //     });
    //     this.features.push({
    //       key: 'building',
    //       value: 'civic'
    //     });
    //     this.features.push({
    //       key: 'emergency',
    //       value: 'ambulance_station|defibrillator|landing_site|emergency_ward_entrance|phone|'
    //     });
    //     this.features.push({
    //       key: 'office',
    //       value: 'lawyer|notary'
    //     });
    //   }
  
    //   this.myQuery = '[out:json][timeout:900];area(' + this.searchArea + ')->.searchArea;(';
      
    //   this.features.forEach(feature => {
    //     this.myQuery += 'node["' + feature.key + '"~"' + feature.value + '"](area.searchArea);';
    //     this.myQuery += 'way["' + feature.key + '"~"' + feature.value + '"](area.searchArea);';
    //     this.myQuery += 'relation["' + feature.key + '"~"' + feature.value + '"](area.searchArea);';
    //   });
  
    //   this.myQuery += ');out body geom;';
  
    //   console.log(this.myQuery);
  
    //   $.ajax({
    //     type: 'POST',
    //     url: 'https://overpass-api.de/api/interpreter',
    //     // data: '[out:json][timeout:25];area(' + this.searchArea + ')->.searchArea;(node["' + this.key + '"~"' + this.value + '"](area.searchArea);way["' + this.key + '"~"' + this.value + '"](area.searchArea);relation["' + this.key + '"~"' + this.value + '"](area.searchArea););out body geom;',
    //     data: this.myQuery,
    //     success: (data => {
    //       console.log(data);
    //       var geoJSONdata = osmtogeojson(data);
    //       console.log(geoJSONdata);
    //       this.geoJSONLayer = L.geoJSON(geoJSONdata, {
    //         style: function (feature) {
    //             // return {color: feature.properties.color};
    //             return {
    //               color: "#0288D1"
    //             };
    //         },
    //         onEachFeature: function (feature, layer) {
    //           layer.bindPopup(JSON.stringify(feature.properties));
    //         }
    //       }).addTo(this.map);
    //     })
    //   });
  }

}
