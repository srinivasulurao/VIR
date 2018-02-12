import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  attemptChangePassword(){

    var old_password=this['old_password'];
    var new_password=this['set_password'];
    var confirm_new_password=this['confirm_set_password'];
    var alert_message="";
    var validation=true; 

    if(old_password!=localStorage.getItem('password')){
      alert_message+="<li>Old Password is incorrect !</li>";
      validation=false;
    }
    if(new_password!=confirm_new_password){
      alert_message+="<li>New Entered passwords are not matching !</li>";
      validation=false;
    }
    if((new_password==null || new_password==undefined) || (confirm_new_password==null || confirm_new_password==undefined) || (old_password ==null || old_password==undefined)){
      alert_message+="<li>All fields are mandatory !</li>";
      validation=false; 
    }


    if(validation==true){
       //Start the change password webservice here.
       let loaderCtrl = this.loader.create({
        content: 'Sending Request ...'
      });

      loaderCtrl.present();

      this.virWS.changePassword(new_password).subscribe(response => {
 
        loaderCtrl.dismiss();

        localStorage.setItem('password',new_password);

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: response.response_message, 
          buttons: ['Dismiss']
        });
  
        alert.present();
        this['old_password']="";
        this['set_password']="";
        this['confirm_set_password']=""; 
          
        
      }); //Ajax Call ends here.
       

    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Authentication Failed',
        subTitle: "<ul>"+alert_message+"</ul>",
        buttons: ['Dismiss']
      });

      alert.present();
    }


  }
}
