import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { OfflineCategoriesPage } from '../offline-categories/offline-categories';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { HowItWorksPage } from '../how-it-works/how-it-works'; 
/**
 * Generated class for the MemberHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-home',
  templateUrl: 'member-home.html',
})
export class MemberHomePage {

  public carouselImage:any;
  public advertisersOnline:any;
  public advertisersOffline:any;
  offlineStores:any;
  onlineStores:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public virWS:VirWebService,
              public alertCtrl: AlertController,
              public loader: LoadingController,
              private platform: Platform,
              private iab: InAppBrowser) {

    this.getHomeCarouselImages();
    this.getAdvertisersOnline();
    this.getAdvertiserOffline();
    this.getOfflineStoresList();
    this.getOnlineStoresList();
  }

  getHomeCarouselImages(){

        var user_id=localStorage.getItem('userid');
        var hash_key=localStorage.getItem('hashkey');
        this.carouselImage=new Array();
        this.virWS.getSliderImages(user_id,hash_key).subscribe(response=>{

          for(var i=0;i<response.result.length;i++){
            this.carouselImage[i]=response.result[i].banner;
          }

          //console.log(this.carouselImage);

        }); //Ajax Call ends here.

  }

  getAdvertisersOnline(){
    var user_id=localStorage.getItem('userid');
    var hash_key=localStorage.getItem('hashkey');

    this.advertisersOnline=new Array();
    //this.advertisersOnline[0]="https://dxl5hzwa4nw52.cloudfront.net/images/post/snapdeal-online-shopping.png";
    this.virWS.getAdvertisementImages(user_id,hash_key).subscribe(response=>{

      this.advertisersOnline=response.result;

      //console.log(this.carouselImage);

    }); //Ajax Call ends here.
  }

  getAdvertiserOffline(){
    var user_id=localStorage.getItem('userid');
    var hash_key=localStorage.getItem('hashkey');

    this.advertisersOffline=new Array();

    this.virWS.getOfferImages(user_id,hash_key).subscribe(response=>{
      this.advertisersOffline=response.result;
      //console.log(this.carouselImage);

    }); //Ajax Call ends here.
  }

  getOfflineStoresList(){

    this.virWS.getOfflineStores().subscribe(response=>{

      this.offlineStores=response.result;
      //console.log(response);

    }); //Ajax Call ends here.

  }

  getOnlineStoresList(){

    this.virWS.getOnlineStores().subscribe(response=>{

      this.onlineStores=response.result;
     // console.log(response);

    }); //Ajax Call ends here.

  }

  onlineSelected(id){
    let url = 'https://www.flipkart.com/';
    this.platform.ready().then(
      () => {
        this.iab.create(url,'_self',{location:'no',EnableViewPortScale:'yes',closebuttoncaption:'Done',zoom:'no'});
      }
    );
  }

  navigateHelp(){ 
    this.navCtrl.push(HowItWorksPage);
  }

  getIndex(i){
    if(i){
      return '';
    }else{
      return 'firstIndexClass';
    }
  }

  offlineSelected(id,title){
    this.navCtrl.push(OfflineCategoriesPage, {
      store_id: id,
      store_name: title
    });
  }

}
