import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OfflineProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline-product-details',
  templateUrl: 'offline-product-details.html',
})
export class OfflineProductDetailsPage {
  public offlineProduct:any;
  public product_main_image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.offlineProduct=this.navParams.get('product_details'); 
    this.product_main_image=this.offlineProduct.mainimage;
  }


  getProductDetail(){
    

  }
  


}
