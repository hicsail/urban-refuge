import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {

  URL;
  
  educationData;
  workData;
  housingData;
  cashData;
  healthData;
  otherData;

  constructor(private cache: CacheService, public http: HttpClient) {

    this.URL = 'https://overpass-api.de/api/interpreter';

    // this.educationRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["amenity"~"college|kindergarten|library|archive|public_bookcase|school|music_school|driving_school|university|research_institute"](area.searchArea);way["amenity"~"college|kindergarten|library|archive|public_bookcase|school|music_school|driving_school|university|research_institute"](area.searchArea);relation["amenity"~"college|kindergarten|library|archive|public_bookcase|school|music_school|driving_school|university|research_institute"](area.searchArea);node["building"~"university"](area.searchArea);way["building"~"university"](area.searchArea);relation["building"~"university"](area.searchArea););out body geom;';
    // this.workRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["office"~"employment_agency|government"](area.searchArea);way["office"~"employment_agency|government"](area.searchArea);relation["office"~"employment_agency|government"](area.searchArea););out body geom;';
    // this.housingRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["amenity"~"shelter"](area.searchArea);way["amenity"~"shelter"](area.searchArea);relation["amenity"~"shelter"](area.searchArea);node["building"~"apartments|dormitory"](area.searchArea);way["building"~"apartments|dormitory"](area.searchArea);relation["building"~"apartments|dormitory"](area.searchArea););out body geom;';
    // this.cashRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["office"~"charity|ngo"](area.searchArea);way["office"~"charity|ngo"](area.searchArea);relation["office"~"charity|ngo"](area.searchArea););out body geom;';
    // this.healthRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["amenity"~"baby_hatch|clinic|dentist|doctors|hospital|nursing_home|pharmacy|social_facility|veterinary|"](area.searchArea);way["amenity"~"baby_hatch|clinic|dentist|doctors|hospital|nursing_home|pharmacy|social_facility|veterinary|"](area.searchArea);relation["amenity"~"baby_hatch|clinic|dentist|doctors|hospital|nursing_home|pharmacy|social_facility|veterinary|"](area.searchArea);node["healthcare"~"blood_donation"](area.searchArea);way["healthcare"~"blood_donation"](area.searchArea);relation["healthcare"~"blood_donation"](area.searchArea);node["building"~"hospital"](area.searchArea);way["building"~"hospital"](area.searchArea);relation["building"~"hospital"](area.searchArea);node["shop"~"medical_supply|nutrition_supplements"](area.searchArea);way["shop"~"medical_supply|nutrition_supplements"](area.searchArea);relation["shop"~"medical_supply|nutrition_supplements"](area.searchArea););out body geom;';
    // this.otherRequest = '[out:json][timeout:900];area(3600223474)->.searchArea;(node["amenity"~"community_centre|social_centre|courthouse|embassy|internet_cafe|place_of_worship|police|post_office|"](area.searchArea);way["amenity"~"community_centre|social_centre|courthouse|embassy|internet_cafe|place_of_worship|police|post_office|"](area.searchArea);relation["amenity"~"community_centre|social_centre|courthouse|embassy|internet_cafe|place_of_worship|police|post_office|"](area.searchArea);node["building"~"civic"](area.searchArea);way["building"~"civic"](area.searchArea);relation["building"~"civic"](area.searchArea);node["emergency"~"ambulance_station|defibrillator|landing_site|emergency_ward_entrance|phone|"](area.searchArea);way["emergency"~"ambulance_station|defibrillator|landing_site|emergency_ward_entrance|phone|"](area.searchArea);relation["emergency"~"ambulance_station|defibrillator|landing_site|emergency_ward_entrance|phone|"](area.searchArea);node["office"~"lawyer|notary"](area.searchArea);way["office"~"lawyer|notary"](area.searchArea);relation["office"~"lawyer|notary"](area.searchArea););out body geom;';

    // this.http.post(url, )
    // let req = this.http.post(url)
    //   .map(res => {
    //     let toast = this.toastCtrl.create({
    //       message: 'New data from API loaded',
    //       duration: 2000
    //     });
    //     toast.present();
 
    //     return res.json().results;
    //   });
  }

  getData(filter) {
    if (filter === 'Education') {
      this.educationData = this.getResponse(this.getRequestBody({
        amenity: [
          "college",
          "kindergarten",
          "library",
          "archive",
          "public_bookcase",
          "school",
          "music_school",
          "driving_school",
          "university",
          "research_institute"
        ],
        building: [
          "university"
        ]
      }), filter);
      return this.educationData;
    } else if (filter == 'Work') {
      this.workData = this.getResponse(this.getRequestBody({
        office: [
          "employment_agency",
          "government"
        ]
      }), filter);
      return this.workData;
    } else if (filter == 'Housing') {
      this.housingData = this.getResponse(this.getRequestBody({
        amenity: [
          "shelter"
        ],
        building: [
          "apartments",
          "dormitory"
        ]
      }), filter);
      return this.housingData;
    } else if (filter == 'Cash') {
      this.cashData = this.getResponse(this.getRequestBody({
        office: [
          "charity",
          "ngo"
        ]
      }), filter);
      return this.cashData;
    } else if (filter == 'Health') {
      this.healthData = this.getResponse(this.getRequestBody({
        amenity: [
          "baby_hatch",
          "clinic",
          "dentist",
          "doctors",
          "hospital",
          "nursing_home",
          "pharmacy",
          "social_facility",
          "veterinary"
        ],
        healthcare: [
          "blood_donation"
        ],
        building: [
          "hospital"
        ],
        shop: [
          "medical_supply",
          "nutrition_supplements"
        ]
      }), filter);
      return this.healthData;
    } else if (filter == 'Other') {
      this.otherData = this.getResponse(this.getRequestBody({
        amenity: [
          "community_centre",
          "social_centre",
          "courthouse",
          "embassy",
          "internet_cafe",
          "place_of_worship",
          "police",
          "post_office"
        ],
        building: [
          "civic"
        ],
        emergency: [
          "ambulance_station",
          "defibrillator",
          "landing_site",
          "emergency_ward_entrance",
          "phone"
        ],
        office: [
          "lawyer",
          "notary"
        ]
      }), filter);
      return this.otherData;
    }
  }

  getRequestBody(filter) {
    // 3600223474 area of Istanbul
    var requestBody = '[out:json][timeout:900];area(3600223474)->.searchArea;(';
    Object.keys(filter).forEach(key => {
      filter[key].forEach(value => {
        requestBody += 'node["' + key + '"="' + value + '"](area.searchArea);';
      });
    });
    requestBody += ');out body geom;';
    return requestBody;
  }

  getResponse(request, filter) {
    return this.cache.loadFromObservable(filter, this.http.post(this.URL, request));
  }

}
