import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { OfflinePage } from '../offline/offline';
import { OnlinePage } from '../online/online';   
import { LoadingController} from 'ionic-angular';  

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirWebService, public loader: LoadingController) {
  this.type=this.navParams.get('type'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFilterPage');
    this.loadCategoryList(); 
    this.loadSubCategoryList(); 
  }

  loadCategoryList(){
    this.virWS.getCategoryList().subscribe(response => {
      this.categoryList=response.result;
    }); //Ajax Call ends here.
  }

  loadSubCategoryList(){
    this.virWS.getSubCategoryList().subscribe(response => {
      this.subCategoryList=response.result;
    }); //Ajax Call ends here.
  }

  filterStoreList(){
    var cat=this['category_val']
    var sub_cat=this['sub_category_val'];
    var loc=this['location']; 
    var type=(this.type=="offline")?1:2; 

    let loaderCtrl=this.loader.create({
      content: 'Fetching Offline Stores ...'
    });

    loaderCtrl.present();

    this.virWS.filterStoreList(cat,sub_cat,loc,type).subscribe(response => {

      if(this.type=="offline")
         this.navCtrl.push(OfflinePage,{search_result:response});   
      else
         this.navCtrl.push(OnlinePage,{search_result:response});

       loaderCtrl.dismiss(); 
    }); //Ajax Call ends here.

  }

  

}
