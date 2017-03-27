import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage} from '../pages/map/map';
import { ResourceSelectionPage } from '../pages/resource-selection/resource-selection';
import { ViewResourcePage } from '../pages/view-resource/view-resource';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapComponent } from "../components/google-map/google-map";
import { HttpService } from "../providers/http-service";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ResourceSelectionPage,
    GoogleMapComponent,
    ViewResourcePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAYbh5oOwGUAMYAwzPcVdyMuFZlLZ0ffc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ResourceSelectionPage,
    ViewResourcePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService
  ]
})
export class AppModule {}
