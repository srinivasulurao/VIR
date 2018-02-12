import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {GoogleMapPage } from '../google-map/google-map';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the AvailableatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-availableat',
  templateUrl: 'availableat.html',
})
export class AvailableatPage {

  public offline_locations:any;
  public store_name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private iab: InAppBrowser, public device: Device, public appAv: AppAvailability) {

    this.offline_locations= this.navParams.get('locations');
    this.store_name=this.navParams.get('store_name');

    console.log(this.offline_locations);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailableatPage');
  }

  navigateGoogleMap(address,mapaddress){

    /*var coordinate=mapaddress.split("@");
    var cords=coordinate[1].toString().split(",");*/

    //this.navCtrl.push(GoogleMapPage,{lat:cords[0],lng:cords[1], type:'single',address:address});  //This will just show a single google map marker.
    this.launchExternalApp('comgooglemaps://', '', 'comgooglemaps://cords[0],cords[1],address/', mapaddress,'');
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      this.iab.create(httpUrl + username,'_system',{location:'no'});
      return;
    }

    this.appAv.check(app).then(
      () => { // success callback
        this.iab.create(httpUrl + username,'_system',{location:'no'});
      },
      () => { // error callback
        this.iab.create(httpUrl + username,'_system',{location:'no'});
      }
    );
  }



}
