import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfflinePage } from '../offline/offline';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { OfflineProductsPage } from '../offline-products/offline-products';
import { AvailableatPage } from '../availableat/availableat'; 

/**
 * Generated class for the OfflineCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline-categories',
  templateUrl: 'offline-categories.html',
})
export class OfflineCategoriesPage {

   public store_id:any;
   public store_name:any;
   public store_categories:any; 
   public store_banner:any;
   public partner_location:any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
  
      this.store_id=this.navParams.get('store_id');
      this.store_name=this.navParams.get('store_name'); 
      this.store_banner=this.navParams.get('storebanner');   

      this.fetchStoreCategories(this.store_id);
    
    }

    

    fetchStoreCategories(store_id){

        let loaderCtrl=this.loader.create({
          content: 'Loading ...'
        });

        loaderCtrl.present();
        
        this.virWS.getCategoriesByStoreId(store_id).subscribe(response=>{ 

            this.store_categories=response.result.offers;
          
            loaderCtrl.dismiss();
    
         }); //Ajax Call ends here.
    }


    navigateViewDetails(category_id,partnerlocation){

      this.navCtrl.push(OfflineProductsPage,{partner_location:partnerlocation,category_id:category_id,store_id:this.store_id, store_name:this.store_name}); //Navigate and show the list of the products under that category.  

    }

    navigateAvailableAt(partnerlocation){

      this.navCtrl.push(AvailableatPage,{locations:partnerlocation,store_name:this.store_name}); 

    }
    

}
