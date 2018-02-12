import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { OfflineProductDetailsPage } from '../offline-product-details/offline-product-details'; 

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
  public category_id:any;
  public productList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {

    this.store_id=this.navParams.get('store_id');
    this.category_id=this.navParams.get('category_id');     

    this.getStoreCategoryProducts();
  }

  getStoreCategoryProducts(){
      
    let loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    loaderCtrl.present();
    
    this.virWS.getProductsByCategoryId(this.store_id,this.category_id).subscribe(response=>{  

        console.log(response); 

        this.productList=response.result;

        loaderCtrl.dismiss();

     }); //Ajax Call ends here. 

  }

  navigateProductDetails(product){
     this.navCtrl.push(OfflineProductDetailsPage,{product_details:product}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflineProductsPage');
  }

}
