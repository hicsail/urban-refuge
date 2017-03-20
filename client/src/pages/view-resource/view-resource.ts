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
    if(this.resource.types instanceof String){
      this.resource.types = [].push(this.resource.types);
    }
  }

  public getImageURL(type){
    return "assets/images/" + type.toLowerCase() + ".png";
  }
}
