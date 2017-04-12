import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {HockeyApp} from "./hockey-app";

@Injectable()
export class HttpService {

  private domain:string = "https://urbanrefuge.herokuapp.com/api/resource/"

  constructor(public http: Http, private hockeyApp:HockeyApp) {

  }

  getReasource(resource) {
    this.hockeyApp.trackEvent("REQUEST_RESOURCE_TYPE: " + resource);
    var headers = new Headers();
    return this.http.get(this.domain + resource,
      {headers: headers}).map(res => res.json());
  }

}
