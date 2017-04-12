import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import {HockeyApp} from "../../providers/hockey-app";

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})
export class ViewResourcePage {

  public resource;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private hockeyApp:HockeyApp) {
    this.resource = navParams.data;
  }

  public getImageURL(type){
    return "assets/images/" + type.toLowerCase() + ".png";
  }

  public call() {
    this.alertCtrl.create({
      title: this.resource.phone,
      buttons: [
        {
          text: 'No لا',
          handler: () => {}
        },
        {
          text: 'Call مكالمة',
          handler: () => {
            this.hockeyApp.trackEvent("CALL_RESOURCE");
            this.hockeyApp.trackEvent("CALL_RESOURCE: " + this.resource.name);
            new InAppBrowser("tel://"+this.resource.phone,'_system');
          }
        }
      ]
    }).present();
  }

  public text() {
    this.hockeyApp.trackEvent("TEXT_RESOURCE");
    this.hockeyApp.trackEvent("TEXT_RESOURCE: " + this.resource.name);
    new InAppBrowser("sms://"+this.resource.phone,'_system');
  }
}
