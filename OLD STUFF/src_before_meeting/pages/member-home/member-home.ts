import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
/**
 * Generated class for the MemberHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-home',
  templateUrl: 'member-home.html',
})
export class MemberHomePage {

  public carouselImage:any;
  public advertisersOnline:any;
  public advertisersOffline:any;
  offlineStores:any;
  onlineStores:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {

    this.getHomeCarouselImages();
    this.getAdvertisersOnline();
    this.getAdvertiserOffline();
    this.getOfflineStoresList(); 
    this.getOnlineStoresList();
  }

  getHomeCarouselImages(){
    
        var user_id=localStorage.getItem('userid');
        var hash_key=localStorage.getItem('hashkey'); 
        this.carouselImage=new Array();
        this.virWS.getSliderImages(user_id,hash_key).subscribe(response=>{ 
    
          for(var i=0;i<response.result.length;i++){
            this.carouselImage[i]=response.result[i].banner;   
          }
    
          //console.log(this.carouselImage);
    
        }); //Ajax Call ends here.
        
  }

  getAdvertisersOnline(){
    this.advertisersOnline=new Array();
    this.advertisersOnline[0]="https://dxl5hzwa4nw52.cloudfront.net/images/post/snapdeal-online-shopping.png";
  }

  getAdvertiserOffline(){
    this.advertisersOffline=new Array();
    this.advertisersOffline[0]="http://4.bp.blogspot.com/-Xp4XoBd7vuo/V6Cz3mZDBmI/AAAAAAAACkM/RjDWFvaadII1drIpMstpkPBlpdNyLIb4wCK4B/s1600/Hike-Snapdeal-Rs100-free-coupon.png";
  }

  getOfflineStoresList(){
    
    this.virWS.getOfflineStores().subscribe(response=>{ 
      
      this.offlineStores=response.result;
      //console.log(response); 
      
    }); //Ajax Call ends here.

  }

  getOnlineStoresList(){
    
    this.virWS.getOnlineStores().subscribe(response=>{ 
      
      this.onlineStores=response.result;
     // console.log(response); 
      
    }); //Ajax Call ends here.

  }



  getIndex(i){
    if(i){
      return '';
    }else{
      return 'firstIndexClass';
    }
  }

}
