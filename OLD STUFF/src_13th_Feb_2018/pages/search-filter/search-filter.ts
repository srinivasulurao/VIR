import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { OfflinePage } from '../offline/offline';
import { OnlinePage } from '../online/online';
import { LoadingController} from 'ionic-angular';
import { AlertController } from  'ionic-angular'; 
/**
 * Generated class for the SearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
})
export class SearchFilterPage {

  public categoryList:any;
  public subCategoryList:any;
  public type:any;
  public loaderCtrl:any;
  public subloaderCtrl:any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,  public virWS:VirProvider, public loader: LoadingController) {
  this.type=this.navParams.get('search_type');
  }

  ionViewDidLoad() {
    this.loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    

    this.loadCategoryList();
   // this.loadSubCategoryList();
  }

  doRefresh(refresher) {
    

    setTimeout(() => {
      this.loadCategoryList();
      //this.loadSubCategoryList();
      refresher.complete();
    }, 2000);
  }

  loadCategoryList(){

    this.loaderCtrl.present();
    this.virWS.getCategoryList().subscribe(response => {
      this.categoryList=response.result;
      this.loaderCtrl.dismiss();
    }, error=>{
      this.loaderCtrl.dismiss(); 

      let alert = this.alertCtrl.create({
        title: 'Internal Server Error',
        subTitle: error, 
        buttons: [
          {
            text: 'Retry Now',
            handler: () => {
              this.loadCategoryList();
            }
          }
        ]
      });

    alert.present();
  }); //Ajax Call ends here.
  }

  loadSubCategoryList(cat_id){
    this.subloaderCtrl=this.loader.create({
      content: 'Loading ...'
    });
    this.subloaderCtrl.present();
    //console.log(cat_id);
    this.virWS.getSubCategoryList(cat_id).subscribe(response => {
      this.subCategoryList=response.result;
      this.subloaderCtrl.dismiss();
    }, error=>{
      this.subloaderCtrl.dismiss(); 

      let alert = this.alertCtrl.create({
        title: 'Internal Server Error',
        subTitle: error, 
        buttons: [
          {
            text: 'Retry Now',
            handler: () => {
              this.loadSubCategoryList(cat_id);
            }
          }
        ]
      });

    alert.present();
  }); //Ajax Call ends here. 
  }

  filterStoreList(){
    var cat=this['category_val']
    var sub_cat=this['sub_category_val'];
    var loc=this['location'];
    var type=(this.type=="offline")?1:2;

    let loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    loaderCtrl.present();

    this.virWS.filterStoreList(cat,sub_cat,loc,type).subscribe(response => {

      if(this.type=="offline")
         this.navCtrl.push(OfflinePage,{search_result:response});
      else
         this.navCtrl.push(OnlinePage,{search_result:response});

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
              this.filterStoreList();
            }
          }
        ]
      });

    alert.present();
  }); //Ajax Call ends here.

  }



}
