import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

/**
 * Generated class for the GoogleMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
declare var google;
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {


  public API_KEY="AIzaSyDka8ZEAez0lssyiYhMGYSY9P0sOA1fGWM";
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public lat:any;
  public lng:any;
  public information_text:any;
  options : GeolocationOptions;
  currentPos : Geoposition;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private geolocation : Geolocation) {

    this.lat=this.navParams.get('lat');
    this.lng=this.navParams.get('lng');
    this.information_text=this.navParams.get('address');

  }

  ionViewDidLoad() {

      this.loadMap();

  }

  ionViewDidEnter(){
    this.getUserPosition();
  }


  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(this.lat,this.lng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //Let's add the marker here only.
      this.addMarker();
      //Marker added till here.


    }, (err) => {

      console.log(err);
    });

  }

  getUserPosition(){
    this.options = {
      enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;

      console.log(pos);
      this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
      console.log("error : " + err.message);
      ;
    })
  }

  addMarker(){


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = this.information_text;

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
