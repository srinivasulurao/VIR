import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OnlineBuyPage } from '../online-buy/online-buy';
import { SearchFilterPage } from '../search-filter/search-filter';


/**
 * Generated class for the OfflineCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})
export class OnlinePage {

  public onlineStores:any;


    constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {

      this.getOnlineStores();

    }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        this.getOnlineStores();
        refresher.complete();
      }, 2000);
    }

    getOnlineStores(){

      let loaderCtrl=this.loader.create({
        content: 'Loading ...'
      });

      loaderCtrl.present();

      this.virWS.getOnlineStores().subscribe(response=>{

        console.log(response);
        this.onlineStores=response.result;
        loaderCtrl.dismiss();

      }, error=>{
        loaderCtrl.dismiss(); 
  
        let alert = this.alertCtrl.create({
          title: 'Internal Server Error',
          subTitle: error, 
          buttons: [
            {
              text: 'Retry Now',
              handler: () => {
                this.getOnlineStores();
              }
            }
          ]
        });
  
      alert.present();
    }); //Ajax Call ends here.

    }

    ionViewDidLoad() {
      //console.log('ionViewDidLoad OfflinePage');
    }

    navigateSearchFilter(search_type){
      this.navCtrl.push(SearchFilterPage,{search_type:search_type});
    }


    navigateOnlineBuyingPage(op){
      this.navCtrl.push(OnlineBuyPage,{online_store:op});
    }



}
