import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { OfflineProductDetailsPage } from '../offline-product-details/offline-product-details';
import { AvailableatPage } from '../availableat/availableat';

/**
 * Generated class for the OfflineProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline-products',
  templateUrl: 'offline-products.html',
})
export class OfflineProductsPage {

  public store_id:any;
  public store_name:any;
  public category_id:any;
  public productList:any;
  public partner_location:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {

    this.store_id=this.navParams.get('store_id');
    this.category_id=this.navParams.get('category_id');
    this.partner_location=this.navParams.get('partner_location');
    this.store_name=this.navParams.get('store_name');

    this.getStoreCategoryProducts();
  }

  getStoreCategoryProducts(){

    let loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    loaderCtrl.present();

    this.virWS.getProductsByCategoryId(this.store_id,this.category_id).subscribe(response=>{

        this.productList=response.result;

        loaderCtrl.dismiss();

     }); //Ajax Call ends here.

  }

  navigateProductDetails(product){
     this.navCtrl.push(OfflineProductDetailsPage,{product_details:product,store_name:this.store_name,partner_location:this.partner_location});
  }

  navigateAvailableAt(){

    this.navCtrl.push(AvailableatPage,{locations:this.partner_location,store_name:this.store_name});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflineProductsPage');
  }

  GrabNow(){
    this.showAlert();
    /*let loaderCtrl=this.loader.create({
      content: 'Sending Request ...'
    });

    loaderCtrl.present();
    this.virWS.offlineProductGrabNow(this.offlineProduct).subscribe(response => {
      if(response.response_code==1){
        loaderCtrl.dismiss();
        this.showAlert();
      }
    });*/ //Ajax Call ends here.

  }

  showAlert(){
    let message="Thank you for showing interest in 'na' Promotion. Your interest has been shared with the concerned Retailer. Kindly visit the store with your VIR Honour Card to avail your exclusive offer. Availability of product would be on first cum first serve basis and no guarantee of the availability is assured. However you can call the store and confirm the product's availability before visiting the store.Contact No : 0123456789";
    let alert = this.alertCtrl.create({
      title: 'I am Intrested',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
