import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoadingController} from "ionic-angular";
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { AvailableatPage } from '../availableat/availableat';
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
  public prd_image:any;
  public showDiv:any;
  public imageClass:any;
  public prdimage_base_url:any;
  public product_data:any;
  public partner_location:any;
  public store_name:any;
  public discount :any;
  public price :any;
  public virPrice: any;
  public specificationCount : number=0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {
    //this.imageClass =  document.querySelector('.content .prdImage');
    //this.showDiv = document.querySelector('.content #prd0');

    this.offlineProduct=this.navParams.get('product_details');
    this.product_data=this.navParams.get('product_details');
    this.getProductDetails();
    this.product_main_image=this.offlineProduct.mainimage;
    this.prd_image=this.offlineProduct.images;
    this.store_name=this.navParams.get('store_name');
    this.partner_location=this.navParams.get('partner_location');
    this.prdimage_base_url='http://virindia.com/dev/assets/images/product_image/';
  }




  getProductDetails(){

    let loaderCtrl=this.loader.create({
      content: 'Fetching Product Details ...'
    });
    loaderCtrl.present();

    this.virWS.getOfflineProductDetails(this.offlineProduct.id).subscribe(response => {

        this.offlineProduct=response.result[0]; //Product Data coming here.
        this.discount = this.offlineProduct.discountpercentage;
        this.price = this.offlineProduct.price;
        this.virPrice = this.price - ((this.price * this.discount)/100);
        this.specificationCount =  this.offlineProduct.specification.length;
        loaderCtrl.dismiss();
    }); //Ajax Call ends here.


  }

  navigateAvailableAt(){

    this.navCtrl.push(AvailableatPage,{locations:this.partner_location,store_name:this.store_name});

  }

  GrabNow(){

    let loaderCtrl=this.loader.create({
      content: 'Sending Request ...'
    });

    loaderCtrl.present();
    this.virWS.offlineProductGrabNow(this.offlineProduct).subscribe(response => {
          if(response.response_code==1){
            loaderCtrl.dismiss();
            this.showAlert();
          }
    }); //Ajax Call ends here.

  }

  ionViewWillEnter() {
    /*this.imageClass.style.display = 'none';
    this.showDiv.style.display = 'flex';*/
  }

  ionViewWillLeave() {
    //this.showDiv.style.display = 'flex';
  }

  selectedImage(sel_img){
    /*this.imageClass.style.display = 'none';
    this.showDiv = document.querySelector('.content #prd'+id);
    this.showDiv.style.display = 'flex';*/
    this.product_main_image=this.prdimage_base_url+sel_img;

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
