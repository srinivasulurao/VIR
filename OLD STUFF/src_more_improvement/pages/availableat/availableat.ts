import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoogleMapPage } from '../google-map/google-map'; 
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.offline_locations= this.navParams.get('locations');  
    this.store_name=this.navParams.get('store_name');

    console.log(this.offline_locations); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailableatPage');
  }

  navigateGoogleMap(address,mapaddress){
  
    var coordinate=mapaddress.split("@");
    var cords=coordinate[1].toString().split(",");

    this.navCtrl.push(GoogleMapPage,{lat:cords[0],lng:cords[1], type:'single',address:address});  //This will just show a single google map marker. 
  }

}
