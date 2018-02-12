import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from 'ionic-angular';
import { AlertController} from 'ionic-angular';
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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,  public virWS:VirProvider, public loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
    this.getOrderHistoryList();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.getOrderHistoryList();
      refresher.complete();
    }, 2000);
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

     }, error=>{
      loaderCtrl.dismiss(); 

      let alert = this.alertCtrl.create({
        title: 'Internal Server Error',
        subTitle: error, 
        buttons: [
          {
            text: 'Retry Now',
            handler: () => {
              this.getOrderHistoryList();
            }
          }
        ]
      });

    alert.present();
  }); //Ajax Call ends here.
  }

}
