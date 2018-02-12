import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the VirProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VirProvider {

  http:any;
  baseUrl: String;
  masterKey: any;

  constructor(http:Http){
    this.http=http;
    this.masterKey="1234567vir@india7654321";
    this.baseUrl="http://virindia.com/dev/index.php/api/User/";
  }

  //Best way to call the post based webservices.
  //This is the common method for calling login webservice for both member and vendor.
  attemptUserLogin(username,password,role_id){
    var wu=this.baseUrl+"userSignin";
    // let postParams={
    //     master_key:"1234567vir@india7654321",
    //     username:username,
    //     password:password,
    //     roleid:role_id,
    //     submit:'Validate'
    // }
    let postParams = new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('username', username);
    postParams.append('password', password);
    postParams.append('roleid',role_id);

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  changePassword(new_password){

    var wu=this.baseUrl+"setPassword";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('newpassword',new_password);

    return this.http.post(wu, postParams).map(res=>res.json());

  }

  getSliderImages(user_id,hash_key){
    var wu=this.baseUrl+"getSlider";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  getOfflineStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','1');

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  getOnlineStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','2');

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  getExclusiveStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','3');

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  getUserDetails(){

    var wu=this.baseUrl+"getUserDetail";
    var user_type=(parseInt(localStorage.getItem('roleid'))==1)?1:2; //usertype
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('usertype',user_type.toString());

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  getCategoriesByStoreId(store_id){
    var wu=this.baseUrl+"getStoreCategoryOfferList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('storeid',store_id);

    return this.http.post(wu,postParams).map(res=>res.json());
  }

  getProductsByCategoryId(store_id,category_id){

    var wu=this.baseUrl+"getStoreProductByCategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('storeid',store_id);
    postParams.append('categoryid',category_id);

    return this.http.post(wu,postParams).map(res=>res.json());

  }


  getAdvertisementImages(user_id,hash_key){
    var wu=this.baseUrl+"getAdvertisement";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  getOfferImages(user_id,hash_key){
    var wu=this.baseUrl+"getLattestOffer";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  offlineProductGrabNow(productDetails){
    var wu=this.baseUrl.toString()+"book_order";
    let postParams =new FormData();
    postParams.append('productid',productDetails.id);
    postParams.append('partnerid', productDetails.partnerid);
    postParams.append('userid',localStorage.getItem('userid'));

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  offlineOfferGrabNow(categoryDetails){
    var wu=this.baseUrl.toString()+"book_promotion";
    let postParams =new FormData();
   
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));
  
    postParams.append('categoryofferid',categoryDetails.id);
    postParams.append('categoryid',categoryDetails.categoryid);
    postParams.append('partnerid', categoryDetails.partnerid);

    return this.http.post(wu, postParams).map(res=>res.json());
    
  }

  getOfflineProductDetails(product_id){
    var wu=this.baseUrl+"getProductDetail";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('productid',product_id)

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  getCategoryList(){
    var wu=this.baseUrl+"getCategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  getSubCategoryList(){

    var wu=this.baseUrl+"getSubcategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    return this.http.post(wu, postParams).map(res=>res.json());

  }

  filterStoreList(cat,sub_cat,loc,type){
    var wu=this.baseUrl+"filterStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    if(cat!=undefined)
      postParams.append('category',cat);
    if(sub_cat!=undefined)
      postParams.append('subcategory',sub_cat);
    if(loc!=undefined)
      postParams.append('keyword',loc);
    if(type!=undefined)
      postParams.append('producttype',type);

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  getOrderHistory(){

    var wu=this.baseUrl+"order_history";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    return this.http.post(wu, postParams).map(res=>res.json());
  }


  getCardData(card_type,code){

    var wu=this.baseUrl+"get_card_data";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('card_type',card_type);
    postParams.append('code',code);

    return this.http.post(wu, postParams).map(res=>res.json());
  }

  deactivateAccount(reason){
    var wu=this.baseUrl+"deactivate_account";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('reason',reason); 

    return this.http.post(wu, postParams).map(res=>res.json());
  }

}
