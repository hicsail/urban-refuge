import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})
export class ViewResourcePage {

  public resource;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController) {
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
            new InAppBrowser("tel://"+this.resource.phone,'_system');
          }
        }
      ]
    }).present();
  }

  public text() {
    new InAppBrowser("sms://"+this.resource.phone,'_system');
  }
}
