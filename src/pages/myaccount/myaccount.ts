import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,ToastController,App,Platform, } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstRunPage } from '../pages';
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {

  public account:any;
  showMenuPages: any[] = [
    { title: 'About us', component: 'AboutUsPage' },
    { title: 'Team', component: 'TeamPage'},
    { title: "FAQ's", component: 'FaqPage'},
    { title: 'Privacy Policy', component: 'PrivacyPolicyPage'},
    { title: 'Logout', component: ''}
  ]
  personImage:any;
  profileForm:FormGroup;
  changeProfile:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl : ActionSheetController,
              public toastCtrl: ToastController,public loadingCtrl:LoadingController,
              private platform: Platform,
              public app:App,public formBuilder: FormBuilder,
              public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
    this.getAccountDetails();
    this.personImage ='assets/img/personImg.png';


    this.profileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      location:['', Validators.compose([Validators.maxLength(50), Validators.required])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountPage');

  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Are you Sure want to Logout?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            console.log('Logout');
            localStorage.clear();
            this.app.getRootNav().push(FirstRunPage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel logout');
          }
        }
      ]
    });

    actionSheet.present();
  }

  getAccountDetails(){

    this.account={};

    let loaderCtrl=this.loader.create({
      content: 'Loading ...'
    });

    loaderCtrl.present();

    this.virWS.getUserDetails().subscribe(response=>{   
          //console.log(response); 
          this.account=response.result[0];

          loaderCtrl.dismiss();
      
    }); //Ajax Call ends here.

  }

  changeProfileFunction(){
    this.changeProfile=true;
  }
  closeProfileFunction(){
    this.changeProfile=false;
  }

  doUpateProfile() {

  }

}
