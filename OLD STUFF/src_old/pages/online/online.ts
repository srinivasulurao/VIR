import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
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
  
  
    constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
  
      this.getOnlineStores();
  
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
  
      }); //Ajax Call ends here.

    }
  
    ionViewDidLoad() {
      //console.log('ionViewDidLoad OfflinePage');
    }
  
    contentItemSelected(id,title){
      this.navCtrl.push(OnlinePage);
    }

}
