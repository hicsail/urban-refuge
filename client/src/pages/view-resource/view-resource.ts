import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})
export class ViewResourcePage {

  public resource;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resource = navParams.data;
    console.log(this.resource);
  }

  public getImageURL(type) {
    return "assets/images/" + type.toLowerCase() + ".png";
  }

  public jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}
