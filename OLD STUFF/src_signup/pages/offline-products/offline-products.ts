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
  public grabValue:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {

    this.store_id=this.navParams.get('store_id');
    this.category_id=this.navParams.get('category_id');
    this.partner_location=this.navParams.get('partner_location');
    this.store_name=this.navParams.get('store_name');

    this.getStoreCategoryProducts();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getStoreCategoryProducts();
      refresher.complete();
    }, 2000);
  }

  getStoreCategoryProducts(){

    let loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    loaderCtrl.present();

    this.virWS.getProductsByCategoryId(this.store_id,this.category_id).subscribe(response=>{

        this.productList=response.result;

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
              this.getStoreCategoryProducts();
            }
          }
        ]
      });

    alert.present();
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
    this.grabValue=1;
    this.showAlert();
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
