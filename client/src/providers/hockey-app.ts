import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";

@Injectable()
export class HockeyApp {

  private androidAppId:string = "32c9927a690f46b2a7aae178a6165a64";
  private iosAppId:string = "546c46b0adf24f52abfe6f2e29dbfeca";
  private appId:string;

  constructor(private platform:Platform) {

  }

  public start() {
    if (window['hockeyapp']) {
      if (this.platform.is('ios')) {
        this.appId = this.iosAppId;
      }
      else if (this.platform.is('android')) {
        this.appId = this.androidAppId;
      }
      if (this.appId) {
        window['hockeyapp'].start(null, null, this.appId);
      } else {
        console.log("HockeyApp was unable to start");
      }
    } else {
      console.log("HockeyApp not found");
    }
  }

  public trackEvent(name:String): void{
    if (window['hockeyapp']) {
      window['hockeyapp'].trackEvent(null, null, name);
    }
  }

  public checkHockeyAppUpdates(): void {
    if (window['hockeyapp']) {
      window['hockeyapp'].checkForUpdate(null,null);
    }
  }

}
