import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,ToastController,App,Platform, } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstRunPage } from '../pages';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { StaticContentPage } from '../static-content/static-content';

import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { InfringementPolicyPage } from '../infringement-policy/infringement-policy';
import { MemberTermsOfUsePage } from '../member-terms-of-use/member-terms-of-use';
import { PartnerTermsOfUsePage } from '../partner-terms-of-use/partner-terms-of-use';
import { OrderHistoryPage } from '../order-history/order-history';
import { WelcomePage } from '../pages';
import { ChangePasswordPage } from '../change-password/change-password';
import { CloseAccountPage } from '../close-account/close-account'; 
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

  public unregisterBackButtonAction: any;
  public account:any;
  showMenuPages: any[] = [
    { title: 'Infringement Policy', component: InfringementPolicyPage},
    { title: "Privacy Policy", component: PrivacyPolicyPage},
    { title: 'Member Terms of Use', component: MemberTermsOfUsePage},
    { title: 'Partner Terms of Use', component: PartnerTermsOfUsePage},
    { title: 'Order History', component: OrderHistoryPage },
    { title: 'Change Password',component : ChangePasswordPage },
    { title: 'Close Account', component: CloseAccountPage }, 
    { title: 'Logout', component: '' }
  ]

  personImage:any;
  profileForm:FormGroup;
  changeProfile:boolean=false;
  public role_id:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl : ActionSheetController,
              public toastCtrl: ToastController,public loadingCtrl:LoadingController,
              private platform: Platform,
              public app:App,public formBuilder: FormBuilder,
              public virWS:VirProvider, public alertCtrl: AlertController, public loader: LoadingController) {

    this.getAccountDetails();
    this.personImage ='assets/img/personImg.png';



    this.profileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      location:['', Validators.compose([Validators.maxLength(50), Validators.required])],
    })
  }

  ionViewDidLoad() {

    //this.initializeBackButtonCustomHandler();

    this.role_id=localStorage.getItem('roleid');
    console.log('ionViewDidLoad MyaccountPage');

    if(this.role_id==2){
        this.showMenuPages=[
          { title: 'Infringement Policy', component: InfringementPolicyPage},
          { title: "Privacy Policy", component: PrivacyPolicyPage},
          { title: 'Partner Terms of Use', component: PartnerTermsOfUsePage},
          { title: 'Change Password',component : ChangePasswordPage },
          { title: 'Close Account', component: CloseAccountPage }, 
          { title: 'Logout', component: '' }
        ];
    }

  }

  // ionViewWillLeave() {
  //   // Unregister the custom back button action for this page
  //   this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  // }

  // public initializeBackButtonCustomHandler(): void {
  //   this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
  //     this.customHandleBackButton();
  //   }, 10);
  // }

  // private customHandleBackButton(): void {
  //   // do what you need to do here ...
  //   this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
  //     this.customHandleBackButton();
  //   }, 10);
  // }


  openPage(page){
    if(page.title=="Logout"){
      this.presentActionSheet();
    }
    else{
     this.navCtrl.push(page.component,{page:page});
    }
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
            this.app.getRootNav().push(WelcomePage);
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
          console.log(response);
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
