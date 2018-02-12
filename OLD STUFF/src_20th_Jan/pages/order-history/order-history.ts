import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from 'ionic-angular';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  public order_history:any;
  public prod_img_base_url='http://virindia.com/dev/assets/images/product_image/';

  constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirProvider, public loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
    this.getOrderHistoryList();
  }

  getOrderHistoryList(){
    let loaderCtrl=this.loader.create({
      content: 'Fetching Order History ...'
    });

    loaderCtrl.present();

    this.virWS.getOrderHistory().subscribe(response=>{

        this.order_history=response.result;
        console.log(response.result);

        loaderCtrl.dismiss();

     }); //Ajax Call ends here.
  }

}
