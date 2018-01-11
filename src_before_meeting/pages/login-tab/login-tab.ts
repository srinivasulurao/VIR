import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../pages';
import { TabsPage } from '../tabs/tabs';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { VendorTabPage } from '../vendor-tab/vendor-tab';

/**
 * Generated class for the LoginTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //Write the code properly and cleanly.

@IonicPage()
@Component({
  selector: 'page-login-tab',
  templateUrl: 'login-tab.html',
})
export class LoginTabPage {

  name:any;
  image:any;
  loginEvent:any;
  account: { email: string, password: string, phone: string } = {
    email: '',
    password: '',
    phone: ''
  };
  public loaderCtrl:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
    this.name="LogIn";
    this.image='assets/img/logo.png';
    this.loginEvent='member';

    this['member_email']="ram@gmail.com";
    this['member_password']="8888888888";
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginTabPage');
  }
  ngOnInit(){
    this.loginEvent='member';
  }

  doLogin(type){
    if(type=='member') {
      this.loaderCtrl = this.loader.create({
        content: 'Authenticating ...'
      });

      var username = (type == "partner") ? this['partner_email'] : this['member_email'];
      var password = (type == "partner") ? this['partner_password'] : this['member_password'];
      var role_id = (type == "partner") ? 2 : 1;

      if (this.validate(username, password) == false) {
        //Start the webservice Call and check the credentials.
        return false;

      }
      else {
        this.loaderCtrl.present();
        this.virWS.attemptUserLogin(username, password, role_id).subscribe(response => {
          this.loaderCtrl.dismiss();
          //console.log(response);
          if (response.error_message) {
            let alert = this.alertCtrl.create({
              title: 'Login Failed',
              subTitle: response.error_message,
              buttons: ['Dismiss']
            });
            alert.present();
          }
          else {
            //Store the user information in the local storage object.
            localStorage.setItem("fullname", response.result.fullname);
            localStorage.setItem("hashkey", response.result.hashkey);
            localStorage.setItem("roleid", response.result.roleid);
            localStorage.setItem("status", response.result.status);
            localStorage.setItem("userid", response.result.userid);
            localStorage.setItem("username", response.result.username);

            this.navCtrl.push(TabsPage);
          }
        }); //Ajax Call ends here.
      }
    }else if(type=='partner'){
      this.navCtrl.push(VendorTabPage);
    }

  }

  validate(username,password){
    var error="";

    if(username==""){
        error+="<li>Please enter your Username !";
    }
    if(password==""){
        error+="<li>Please enter your Password !";
    }

        if(error!=""){
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: "<ul>"+error+"</ul>",
            buttons: ['Dismiss']
          });

          alert.present();

          return false;
        }
        else{
          return true;
        }
  }







} //class ends here.
