import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})
export class ViewResourcePage {

  resource: Object = {};
  fullAddress: string = '';
  imageURL: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private emailComposer: EmailComposer) {
    this.resource = navParams.data;
    console.log(this.resource);
  }

  ionViewDidLoad() {
    this.imageURL = 'assets/images/' + this.resource['img'].toLowerCase() + '.png';
    this.generateFullAddress();
  }

  // public jsUcfirst(string) {
  //   console.log(string);
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  public sendEmail(email) {
    console.log('email');
    console.log(email);
  }

  public generateFullAddress() {
    if (this.resource['addr:housenumber']) {
      this.fullAddress += this.resource['addr:housenumber'] + ' ';
    }
    if (this.resource['addr:street']) {
      this.fullAddress += this.resource['addr:street'] + ', ';
    }
    if (this.resource['addr:district']) {
      this.fullAddress += this.resource['addr:district'] + ', ';
    }
    if (this.resource['addr:city']) {
      this.fullAddress += this.resource['addr:city'] + ', ';
    }
    if (this.resource['addr:state']) {
      this.fullAddress += this.resource['addr:state'] + ', ';
    }
    if (this.resource['addr:postcode']) {
      this.fullAddress += this.resource['addr:postcode'] + ', ';
    }
    this.fullAddress = this.fullAddress.slice(0, -2);
  }
  
}
