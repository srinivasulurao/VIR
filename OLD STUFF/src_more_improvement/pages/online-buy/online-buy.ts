import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';

/**
 * Generated class for the OnlineBuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-online-buy',
  templateUrl: 'online-buy.html',
})
export class OnlineBuyPage { 

  public online_store:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController, public platform: Platform, public iab: InAppBrowser){

    this.online_store=this.navParams.get('online_store');  
    console.log(this.online_store);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlineBuyPage');
  }

  redirectOnlineStore(){
    //this.navCtrl.push(OnlinePage);
    let url = 'https://www.flipkart.com/';
    this.platform.ready().then(
      () => {
        this.iab.create(url,'_self',{location:'no',EnableViewPortScale:'yes',closebuttoncaption:'Done',zoom:'no'});
      }
    );
  }

}
