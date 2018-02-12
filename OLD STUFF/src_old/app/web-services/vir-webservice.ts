import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class VirWebService{

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

    getProductDetails(product_id){

        var wu=this.baseUrl+"getStoreProductByCategory"; 
        let postParams =new FormData(); 
        postParams.append('master_key',this.masterKey);  
        postParams.append('userid',localStorage.getItem('userid'));
        postParams.append('hashkey', localStorage.getItem('hashkey'));
        postParams.append('storeid',store_id);
        postParams.append('categoryid',category_id); 

        return this.http.post(wu,postParams).map(res=>res.json());

    }

} //Class ends here.