import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { OfflinePage } from '../offline/offline';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
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
   public grabValue:number=0;

    constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {

      this.store_id=this.navParams.get('store_id');
      this.store_name=this.navParams.get('store_name');
      this.store_banner=this.navParams.get('storebanner');

      this.fetchStoreCategories(this.store_id);

    }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        this.store_id=this.navParams.get('store_id');
        this.store_name=this.navParams.get('store_name');
        this.store_banner=this.navParams.get('storebanner');
  
        this.fetchStoreCategories(this.store_id);
        refresher.complete();
      }, 2000);
    }

    fetchStoreCategories(store_id){

        let loaderCtrl=this.loader.create({
          content: 'Loading ...'
        });

        loaderCtrl.present();

        this.virWS.getCategoriesByStoreId(store_id).subscribe(response=>{

            this.store_categories=response.result.offers;

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
                  this.fetchStoreCategories(store_id);
                }
              }
            ]
          });
    
        alert.present();
      }); //Ajax Call ends here.
    }


    navigateViewDetails(category_id,partnerlocation){

      this.navCtrl.push(OfflineProductsPage,{partner_location:partnerlocation,category_id:category_id,store_id:this.store_id, store_name:this.store_name}); //Navigate and show the list of the products under that category.

    }

    navigateAvailableAt(partnerlocation){

      this.navCtrl.push(AvailableatPage,{locations:partnerlocation,store_name:this.store_name});

    }

  GrabNow(offer_category){
    // console.log(offer_category);

    let loaderCtrl=this.loader.create({
     content: 'Sending Request ...'
     });

     loaderCtrl.present();
     this.virWS.offlineOfferGrabNow(offer_category).subscribe(response => {
     if(response.response_code==1){
      this.grabValue=1;
     loaderCtrl.dismiss();
     this.showAlert();
     }
     }, error=>{
      loaderCtrl.dismiss(); 

      let alert = this.alertCtrl.create({
        title: 'Internal Server Error',
        subTitle: error, 
        buttons: [
          {
            text: 'Retry Now',
            handler: () => {
              this.GrabNow(offer_category);
            }
          }
        ]
      });

    alert.present();
  }); //Ajax Call ends here.


  }

  showAlert(){
    let message="Thank you for showing interest, we've notified the vendor. Kindly visit the store to claim your exclusive discount.<br><strong>Don't forget to carry your VIR card !</strong>";
    let alert = this.alertCtrl.create({
      title: 'I am Intrested',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showInterest(value){
    if(value){
      return "Interest Shown";
    }else{
      return "Interested";
    }
  }


}
