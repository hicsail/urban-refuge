import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  private domain:string = "http://localhost:3000/api/resources/"

  constructor(public http: Http) {

  }

  getReasource(resource) {
    var headers = new Headers();
    return this.http.get(this.domain + resource,
      {headers: headers}).map(res => res.json());
  }

}
