import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {VirProvider} from '../../providers/providers';  //This is the webservice.
import {LoadingController} from "ionic-angular";
import {AlertController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
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

  public online_store: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public virWS: VirProvider,
              public alertCtrl: AlertController,
              public loader: LoadingController,
              public platform: Platform,
              public iab: InAppBrowser,
              public device: Device,
              public appAv: AppAvailability) {

    this.online_store = this.navParams.get('online_store');
    console.log(this.online_store);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlineBuyPage');
  }

  redirectOnlineStore(url) {
    //this.navCtrl.push(OnlinePage);
    //let url = 'https://www.flipkart.com/';
    if (url) {
      this.launchExternalApp('://', '', '', url,'');
      /*this.platform.ready().then(
        () => {
          this.iab.create(url, '_self', {
            location: 'no',
            EnableViewPortScale: 'yes',
            closebuttoncaption: 'Done',
            zoom: 'no'
          });
        }
      );*/
    }
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
