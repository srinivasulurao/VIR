import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { OfflineCategoriesPage } from '../offline-categories/offline-categories';  
/**
 * Generated class for the OfflineCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {

  public offlineStores:any;
  
  
    constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
  
      this.getOfflineStores();
  
    }
  
    getOfflineStores(){ 

      let loaderCtrl=this.loader.create({
        content: 'Loading ...'
      });

      loaderCtrl.present();
      
      this.virWS.getOfflineStores().subscribe(response=>{ 
  
        console.log(response); 
        this.offlineStores=response.result; 
        loaderCtrl.dismiss();
  
      }); //Ajax Call ends here.

    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad OfflinePage');
    }
  
    contentItemSelected(id,title){
      this.navCtrl.push(OfflineCategoriesPage, {
        store_id: id,
        store_name: title
      });
    }

}
