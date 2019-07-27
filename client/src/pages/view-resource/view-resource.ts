import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { HockeyApp } from 'ionic-hockeyapp';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-view-resource',
  templateUrl: 'view-resource.html'
})

export class ViewResourcePage {

  resource: Object = {};
  fullAddress: string = '';
  imageURL: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private callNumber: CallNumber, private sms: SMS, private hockeyApp:HockeyApp, private emailComposer: EmailComposer, private iab: InAppBrowser) {
    this.resource = navParams.data;
  }

  ionViewDidLoad() {
    this.imageURL = 'assets/images/' + this.resource['img'].toLowerCase() + '.png';
    this.generateFullAddress();
  }

  public sendEmail() {
    // send email to the resource
    let email = {
      to: this.resource['email']
    };
    this.emailComposer.open(email);
  }

  public openWebsite() {
    // open website of the resource
    const browser = this.iab.create(this.resource['website'], '_self', {
      zoom: 'no'
    });
  }

  // generating full address out of the given information
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
    // cutting comma and space at the of the full address
    this.fullAddress = this.fullAddress.slice(0, -2);
  }

  // calling a phone number
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
          }
        }
      ]
    }).present();
  }

  // sending a message
  public text() {
    this.hockeyApp.trackEvent("TEXT_RESOURCE");
    this.hockeyApp.trackEvent("TEXT_RESOURCE: " + this.resource['name']);
    this.sms.send(this.resource['phone'], '', {
      android: {
        intent: 'INTENT'
      }
    });
  }
  
}
