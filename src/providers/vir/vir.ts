import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

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
    let postParams = new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('username', username);
    postParams.append('password', password);
    postParams.append('roleid',role_id);

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);  
  }

  attemptPartnerRegistration(userArray){
    var wu=this.baseUrl+"partnerSignUp";
    let postParams = new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userData',JSON.stringify(userArray));
    postParams.append('hashkey', localStorage.getItem('hashkey'));

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);  
  }

  attemptMemberRegistration(userArray,main_image,image1,image2,image3,image4,image5,image6){
    var wu=this.baseUrl+"memberSignUp";  
    let postParams = new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userData',JSON.stringify(userArray));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('main_image',main_image);
    postParams.append('image1',image1);
    postParams.append('image2',image2);
    postParams.append('image3',image3);
    postParams.append('image4',image4);
    postParams.append('image5',image5);
    postParams.append('image6',image6);

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }
  

  _errorHandler(error:Response){
     return Observable.throw("<span style='color:#960000'>Encounterd a server error, please try again after some time.</span>" || error);   
  }

  changePassword(new_password){

    var wu=this.baseUrl+"setPassword";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('newpassword',new_password);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);

  }

  getSliderImages(user_id,hash_key){
    var wu=this.baseUrl+"getSlider";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getOfflineStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','1');

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getOnlineStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','2');

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getExclusiveStores(){
    var wu=this.baseUrl+"getStoreList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('producttype','3');

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getUserDetails(){

    var wu=this.baseUrl+"getUserDetail";
    var user_type=(parseInt(localStorage.getItem('roleid'))==1)?1:2; //usertype
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('usertype',user_type.toString());

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getCategoriesByStoreId(store_id){
    var wu=this.baseUrl+"getStoreCategoryOfferList";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('storeid',store_id);

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getProductsByCategoryId(store_id,category_id){

    var wu=this.baseUrl+"getStoreProductByCategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid',localStorage.getItem('userid'));
    postParams.append('hashkey', localStorage.getItem('hashkey'));
    postParams.append('storeid',store_id);
    postParams.append('categoryid',category_id);

    return this.http.post(wu,postParams).map(res=>res.json()).catch(this._errorHandler);

  }


  getAdvertisementImages(user_id,hash_key){
    var wu=this.baseUrl+"getAdvertisement";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getOfferImages(user_id,hash_key){
    var wu=this.baseUrl+"getLattestOffer";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', user_id);
    postParams.append('hashkey', hash_key);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  offlineProductGrabNow(productDetails){
    var wu=this.baseUrl.toString()+"book_order";
    let postParams =new FormData();
    postParams.append('productid',productDetails.id);
    postParams.append('partnerid', productDetails.partnerid);
    postParams.append('userid',localStorage.getItem('userid'));

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
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

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
    
  }

  getOfflineProductDetails(product_id){
    var wu=this.baseUrl+"getProductDetail";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('productid',product_id)

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getCategoryList(){
    var wu=this.baseUrl+"getCategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getSubCategoryList(cat_id){
   
    var wu=this.baseUrl+"getSubcategory";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));
    postParams.append('cat_id',cat_id);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);

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

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  getOrderHistory(){

    var wu=this.baseUrl+"order_history";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }


  getCardData(card_type,code){

    var wu=this.baseUrl+"get_card_data";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('card_type',card_type);
    postParams.append('code',code);

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

  deactivateAccount(reason){
    var wu=this.baseUrl+"deactivate_account";
    let postParams =new FormData();
    postParams.append('master_key',this.masterKey);
    postParams.append('userid', localStorage.getItem('userid'));
    postParams.append('hashkey',localStorage.getItem('hashkey'));

    postParams.append('reason',reason); 

    return this.http.post(wu, postParams).map(res=>res.json()).catch(this._errorHandler);
  }

}
