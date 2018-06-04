import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
// import { EmailComposer } from '@ionic-native/email-composer';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { HockeyApp } from 'ionic-hockeyapp';

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})
export class ViewResourcePage {

  resource: Object = {};
  fullAddress: string = '';
  imageURL: string = '';

  // private emailComposer: EmailComposer,
  // private iab: InAppBrowser
  // ,public platform: Platform
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private sms: SMS,
    private hockeyApp:HockeyApp
  ) {
    this.resource = navParams.data;
    // console.log(this.resource);
    // console.log(navCtrl.getViews());
    // navCtrl.pop
    // platform.ready().then(() => {
    //   platform.registerBackButtonAction(() => {
    //     console.log("backPressed");
    //   });
    // });
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

  public call() {
    this.alertCtrl.create({
      title: this.resource['phone'],
      buttons: [
        {
          text: 'No لا',
          handler: () => {}
        },
        {
          text: 'Call مكالمة',
          handler: () => {
            this.hockeyApp.trackEvent("CALL_RESOURCE");
            this.hockeyApp.trackEvent("CALL_RESOURCE: " + this.resource['name']);
            this.callNumber.callNumber(this.resource['phone'], true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
            // new InAppBrowser("tel://"+this.resource.phone,'_system');
          }
        }
      ]
    }).present();
  }

  public text() {
    console.log('text');
    this.hockeyApp.trackEvent("TEXT_RESOURCE");
    this.hockeyApp.trackEvent("TEXT_RESOURCE: " + this.resource['name']);
    this.sms.send(this.resource['phone'], '', {
      android: {
        intent: 'INTENT'
      }
    });
    // new InAppBrowser("sms://"+this.resource.phone,'_system');
  }
  
}
