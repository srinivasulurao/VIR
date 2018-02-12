import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { WelcomePage } from '../pages';

/**
 * Generated class for the CloseAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-close-account',
  templateUrl: 'close-account.html',
})
export class CloseAccountPage {

  constructor(public app:App, public navCtrl: NavController, public navParams: NavParams, public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CloseAccountPage');
  }

  attemptAccountDeactivation(){

    let alert = this.alertCtrl.create({
      title: 'Think Again !',
      subTitle: "Yes, please go ahead !",
      buttons: [{text:'Yes', handler: () => {
           this.processAccountDeactivation();
      }},
      {text:"No",handler:()=>{
         console.log("Deactivation Stopped !"); 
      }}]
    });

    alert.present();

  }

  processAccountDeactivation(){

    var reason=this['deactivate_reason'];

    let loaderCtrl = this.loader.create({
      content: 'Deactivating Account ...'
    });

    loaderCtrl.present();

    this.virWS.deactivateAccount(reason).subscribe(response => {

      loaderCtrl.dismiss(); 
      
      let alert = this.alertCtrl.create({
        title: 'Notification',
        subTitle: response.response_message,
        buttons: [{text:'Dismiss', handler: () => {
          console.log('Logout');
            localStorage.clear();
            this.app.getRootNav().push(WelcomePage);
        }}]
      });

      alert.present(); 

      

    }); //Ajax call ends here.
  }

  DestroySession(){

  }

}
