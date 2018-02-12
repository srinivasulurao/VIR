import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { MainPage } from '../pages';
import { TabsPage } from '../tabs/tabs';
import { VirProvider } from '../../providers/providers';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';
import { VendorTabPage } from '../vendor-tab/vendor-tab';

import { MemberTermsOfUsePage } from '../member-terms-of-use/member-terms-of-use';
import { PartnerTermsOfUsePage } from '../partner-terms-of-use/partner-terms-of-use';
/**
 * Generated class for the SignupTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-tab',
  templateUrl: 'signup-tab.html',
})
export class SignupTabPage {

  image:any;
  loginEvent:any;

  signUpMemberForm: FormGroup;

  private signupMemberErrorString: string;

  signUpPartnerrForm: FormGroup;

  private signupPartnerErrorString: string;
  main_uploaded_pic:string;
  memberAccount: { 
    full_name: string,
    mobile: string,
    email: string,
    dob: string,
    city: string,
    state: string,
    dependant: string,
    full_name_1: string,
    relation_1:string,
    mobile_no_1: string,
    email_1: string,
    user_dob_1: string,
    city_1: string,
    state_1: string,
    full_name_2: string,
    relation_2:string,
    mobile_no_2: string,
    email_2: string,
    user_dob_2: string,
    city_2: string,
    state_2: string,
    full_name_3: string,
    relation_3:string,
    mobile_no_3: string,
    email_3: string,
    user_dob_3: string,
    city_3: string,
    state_3: string,
    full_name_4: string,
    relation_4:string,
    mobile_no_4: string,
    email_4: string,
    user_dob_4: string,
    city_4: string,
    state_4: string,
    full_name_5: string,
    relation_5:string,
    mobile_no_5: string,
    email_5: string,
    user_dob_5: string,
    city_5: string,
    state_5: string,
    full_name_6: string,
    relation_6:string,
    mobile_no_6: string,
    email_6: string,
    user_dob_6: string,
    city_6: string,
    state_6: string,
    terms: boolean
} = {
  full_name: 'Test',
  mobile: '1234567890',
  email: 'test@gmail.com',
  dob: '25-02-1990',
  city: 'Bnagalore',
  state: 'Karnataka',
  dependant: '1',
  full_name_1: 'Test1',
  relation_1:'Son',
  mobile_no_1: '1234567890',
  email_1: 'test1@test.com',
  user_dob_1: '25-02-2000',
  city_1: 'Banhglore',
  state_1: 'Kar`',
  full_name_2: '',
  relation_2:'',
  mobile_no_2: '',
  email_2: '',
  user_dob_2: '',
  city_2: '',
  state_2: '',
  full_name_3: '',
  relation_3:'',
  mobile_no_3: '',
  email_3: '',
  user_dob_3: '',
  city_3: '',
  state_3: '',
  full_name_4: '',
  relation_4:'',
  mobile_no_4: '',
  email_4: '',
  user_dob_4: '',
  city_4: '',
  state_4: '',
  full_name_5: '',
  relation_5:'',
  mobile_no_5: '',
  email_5: '',
  user_dob_5: '',
  city_5: '',
  state_5: '',
  full_name_6: '',
  relation_6:'',
  mobile_no_6: '',
  email_6: '',
  user_dob_6: '',
  city_6: '',
  state_6: '',
  terms: false
};

  partnerAccount: { 
      brand_name: string,
      company_name: string,
      proprietor: string,
      outlet_no: string,
      head_address: string,
      head_city: string,
      head_state: string,
      head_mobile: string,
      category: string,
      customer_care: string,
      retail: string,
      website: string,
      contact_person: string,
      designation: string,
      email: string,
      mobile: string,
      alt_mobile: string,
      gstinno: string,
      terms: boolean
  } = {
    brand_name: 'Teewink',
    company_name: 'Teewink',
    proprietor: 'Ambani',
    outlet_no: '50',
    head_address: 'HSR Layout',
    head_city: 'Bangalore',
    head_state: 'Karnataka',
    head_mobile: '1234567890',
    category: '1',
    customer_care: '1234567890',
    retail: 'Both',
    website: 'xyx.com',
    contact_person: 'Mohan',
    designation: 'Designer',
    email: 'mohan@gmail.com',
    mobile: '312321312',
    alt_mobile: '23213123123',
    gstinno: '321323213',
    terms: true
  };

  public loaderCtrl:any;
  public viewDependants:number=0;
  public loaderCategoryCtrl:any;
  public categoryList:any;
  public loadingMemberCtrl:any;
  public loadingPartnerCtrl:any;

  constructor(public navCtrl: NavController,
              private imagePicker: ImagePicker,
              public navParams: NavParams,
              public virWS:VirProvider,
              private transfer: FileTransfer,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder) {
    this.image='assets/img/logo.png';
    this.loginEvent='member';

    this.signUpPartnerrForm = formBuilder.group({
      brand_name:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      company_name:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      proprietor:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      outlet_no:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      head_address:  ['', Validators.compose([Validators.maxLength(500), Validators.required])],
      head_city:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      head_state:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      head_mobile: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      category:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      customer_care : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      retail:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      website:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      contact_person:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      designation:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      email:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      alt_mobile: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      gstinno:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      terms:  ['', Validators.compose([Validators.maxLength(50), Validators.required])]
    })

    this.signUpMemberForm = formBuilder.group({
      full_name:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      email:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      dob:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city:  ['', Validators.compose([Validators.maxLength(500), Validators.required])],
      state:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      dependant:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_1: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_1:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_1 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_1:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_1:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_1:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_1:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_2: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_2:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_2 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_2:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_2:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_2:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_2:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_3: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_3:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_3 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_3:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_3:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_3:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_3:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_4: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_4:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_4 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_4:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_4:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_4:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_4:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_5: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_5:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_5 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_5:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_5:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_5:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_5:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      full_name_6: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      relation_6:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      mobile_no_6 : ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      email_6:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      user_dob_6:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      city_6:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      state_6:  ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      terms:  ['', Validators.compose([Validators.maxLength(50), Validators.required])]
    })
  }

  ionViewDidLoad() {
    this.loaderCategoryCtrl=this.loaderCtrl.create({
      content: 'Loading ...'
    });

    this.loadCategoryList();
  }

  ngOnInit(){
    this.loginEvent='member';
  }

  loadCategoryList(){

    this.loaderCategoryCtrl.present();
    this.virWS.getCategoryList().subscribe(response => {
      this.categoryList=response.result;
      this.loaderCategoryCtrl.dismiss();
    }, error=>{
      this.loaderCategoryCtrl.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Internal Server Error',
        subTitle: error,
        buttons: ['Dismiss']
      });

      alert.present();
    }); //Ajax Call ends here.
  }

  showDependent(event){
    this.viewDependants=event;
  }

  doSignUp(type,arrayInput){
    if(type=='partner'){

      this.loadingPartnerCtrl= this.loaderCtrl.create({
        content: 'Register with VIR ...'
      });
       //console.log(arrayInput);
       if (this.partnerValidate(arrayInput) == false) {
        return false;
      }
      else{
        this.loadingPartnerCtrl.present();
        this.virWS.attemptPartnerRegistration(arrayInput).subscribe(response => {
          this.signUpPartnerrForm.reset();
          this.loadingPartnerCtrl.dismiss();
          console.log(response);
          if (response.response_message) {
            let alert = this.alertCtrl.create({
              title: 'Notification',
              subTitle: response.response_message,
              buttons: ['Dismiss']
            });
            alert.present();
          }
          else {
          /*    
            if(type=="member")
              this.navCtrl.setRoot(MainPage);
            else
              this.navCtrl.setRoot(VendorPage);*/
          }
        }, error=>{
            this.loadingPartnerCtrl.dismiss(); 

            let alert = this.alertCtrl.create({
              title: 'Internal Server Error',
              subTitle: error, 
              buttons: ['Dismiss']
            });
    
          alert.present();
        }); 
      }
    }else if(type=='member'){
      this.loadingMemberCtrl  = this.loaderCtrl.create({
        content: 'Register with VIR ...'
      });
      //console.log(arrayInput);
      if (this.memberValidate(arrayInput) == false) {
       return false;
     }
     else{
      this.loadingMemberCtrl.present();
      this.virWS.attemptMemberRegistration(arrayInput).subscribe(response => {
        this.loadingPartnerCtrl.dismiss();
        console.log(response);
        if (response.response_message) {
          let alert = this.alertCtrl.create({
            title: 'Registeration Failed',
            subTitle: response.response_message,
            buttons: ['Dismiss']
          });
          alert.present();
        }
        else {
        }
      }, error=>{
          this.loadingMemberCtrl.dismiss(); 

          let alert = this.alertCtrl.create({
            title: 'Internal Server Error',
            subTitle: error, 
            buttons: ['Dismiss']
          });
  
        alert.present();
      }); 
     }
    }
  }

  validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  memberValidate(inputArray){
    let error="";

    if(inputArray.full_name==""){
      error+="<li>Please enter Full Name !";
    }
    if(inputArray.mobile==""){
      error+="<li>Please enter Mobile Number !";
    }
    if(inputArray.email==""){
      error+="<li>Please enter Email id !";
    }
    if(!this.validateEmail(inputArray.email)){
      error+="<li>Please enter Valid Email id !";
    }
    if(inputArray.dob==""){
      error+="<li>Please enter Date Of Birth !";
    }
    if(inputArray.city==""){
      error+="<li>Please enter City !";
    }
    if(inputArray.state==""){
      error+="<li>Please enter State !";
    }

    let dependantsValue = inputArray.dependant;
    if(dependantsValue){
      if((1 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_1==""){
          error+="<li>Please enter Full Name for Member 1!";
        }
        if(inputArray.mobile_no_1==""){
          error+="<li>Please enter Mobile Number for Member 1!";
        }
        if(inputArray.email_1==""){
          error+="<li>Please enter Email id for Member 1!";
        }
        if(!this.validateEmail(inputArray.email_1)){
          error+="<li>Please enter Valid Email id for Member 1!";
        }
        if(inputArray.user_dob_1==""){
          error+="<li>Please enter Date Of Birth for Member 1!";
        }
        if(inputArray.city_1==""){
          error+="<li>Please enter City for Member 1!";
        }
        if(inputArray.state_1==""){
          error+="<li>Please enter State for Member 1!";
        }
      }
      if((2 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_2==""){
          error+="<li>Please enter Full Name for Member 2!";
        }
        if(inputArray.mobile_no_2==""){
          error+="<li>Please enter Mobile Number for Member 2!";
        }
        if(inputArray.email_2==""){
          error+="<li>Please enter Email id for Member 2!";
        }
        if(!this.validateEmail(inputArray.email_2)){
          error+="<li>Please enter Valid Email id for Member 2!";
        }
        if(inputArray.user_dob_2==""){
          error+="<li>Please enter Date Of Birth for Member 2!";
        }
        if(inputArray.city_2==""){
          error+="<li>Please enter City for Member 2!";
        }
        if(inputArray.state_2==""){
          error+="<li>Please enter State for Member 2!";
        }
      }
      if((3 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_3==""){
          error+="<li>Please enter Full Name for Member 3!";
        }
        if(inputArray.mobile_no_3==""){
          error+="<li>Please enter Mobile Number for Member 3!";
        }
        if(inputArray.email_3==""){
          error+="<li>Please enter Email id for Member 3!";
        }
        if(!this.validateEmail(inputArray.email_3)){
          error+="<li>Please enter Valid Email id for Member 3!";
        }
        if(inputArray.user_dob_3==""){
          error+="<li>Please enter Date Of Birth for Member 3!";
        }
        if(inputArray.city_3==""){
          error+="<li>Please enter City for Member 3!";
        }
        if(inputArray.state_3==""){
          error+="<li>Please enter State for Member 3!";
        }
      }
      if((4 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_4==""){
          error+="<li>Please enter Full Name for Member 4!";
        }
        if(inputArray.mobile_no_4==""){
          error+="<li>Please enter Mobile Number for Member 4!";
        }
        if(inputArray.email_4==""){
          error+="<li>Please enter Email id for Member 4!";
        }
        if(!this.validateEmail(inputArray.email_4)){
          error+="<li>Please enter Valid Email id for Member 4!";
        }
        if(inputArray.user_dob_4==""){
          error+="<li>Please enter Date Of Birth for Member 4!";
        }
        if(inputArray.city_4==""){
          error+="<li>Please enter City for Member 4!";
        }
        if(inputArray.state_4==""){
          error+="<li>Please enter State for Member 4!";
        }
      }
      if((5 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_5==""){
          error+="<li>Please enter Full Name for Member 5!";
        }
        if(inputArray.mobile_no_5==""){
          error+="<li>Please enter Mobile Number for Member 5!";
        }
        if(inputArray.email_5==""){
          error+="<li>Please enter Email id for Member 5!";
        }
        if(!this.validateEmail(inputArray.email_5)){
          error+="<li>Please enter Valid Email id for Member 5!";
        }
        if(inputArray.user_dob_5==""){
          error+="<li>Please enter Date Of Birth for Member 5!";
        }
        if(inputArray.city_5==""){
          error+="<li>Please enter City for Member 5!";
        }
        if(inputArray.state_5==""){
          error+="<li>Please enter State for Member 5!";
        }
      }
      if((6 <= dependantsValue) && (dependantsValue < 7)){
        if(inputArray.full_name_6==""){
          error+="<li>Please enter Full Name for Member 6!";
        }
        if(inputArray.mobile_no_6==""){
          error+="<li>Please enter Mobile Number for Member 6!";
        }
        if(inputArray.email_6==""){
          error+="<li>Please enter Email id for Member 6!";
        }
        if(!this.validateEmail(inputArray.email_6)){
          error+="<li>Please enter Valid Email id for Member 6!";
        }
        if(inputArray.user_dob_6==""){
          error+="<li>Please enter Date Of Birth for Member 6!";
        }
        if(inputArray.city_6==""){
          error+="<li>Please enter City for Member 6!";
        }
        if(inputArray.state_6==""){
          error+="<li>Please enter State for Member 6!";
        }
      }
    }
    
    if(!inputArray.terms){
      error+="<li>Please select Terms and Condition !";
    }

    if(error!=""){
      let alert = this.alertCtrl.create({
        title: 'VIR Partner Registration Failed',
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

  partnerValidate(inputArray){
    var error="";

    if(inputArray.brand_name==""){
      error+="<li>Please enter Brand Name !";
    }
    if(inputArray.company_name==""){
      error+="<li>Please enter Company Name !";
    }
    if(inputArray.proprietor==""){
      error+="<li>Please enter Owned By !";
    }
    if(inputArray.outlet_no==""){
      error+="<li>Please enter Number of Outlet !";
    }
    if(inputArray.head_city==""){
      error+="<li>Please enter City !";
    }
    if(inputArray.head_state==""){
      error+="<li>Please enter State !";
    }
    if(inputArray.head_mobile==""){
      error+="<li>Please enter Contact Number !";
    }
    if(inputArray.customer_care==""){
      error+="<li>Please enter Customer Care Number !";
    }
    if(inputArray.contact_person==""){
      error+="<li>Please enter Contact Person !";
    }
    if(inputArray.designation==""){
      error+="<li>Please enter Designation !";
    }
    if(inputArray.email==""){
      error+="<li>Please enter Email id !";
    }
    if(!this.validateEmail(inputArray.email)){
      error+="<li>Please enter Valid Email id !";
    }
    if(inputArray.mobile==""){
      error+="<li>Please enter Mobile !";
    }
    if(inputArray.gstinno==""){
      error+="<li>Please enter GSTIN !";
    }
    if(!inputArray.terms){
      error+="<li>Please select Terms and Condition !";
    }
    if(error!=""){
      let alert = this.alertCtrl.create({
        title: 'VIR Partner Registration Failed',
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

  viewTerms(type){
    if(type=='member') {
      this.navCtrl.push(MemberTermsOfUsePage);
    }else{
      this.navCtrl.push(PartnerTermsOfUsePage);
    }

  }

  addCameraImage(){
    var options={maximumImagesCount:1,outputType:0};
    var reader=new FileReader();
    this.imagePicker.getPictures(options).then((results) => {

        //console.log(results);
    
            this.main_uploaded_pic=results[0];
            return false;
        
        
    }, (err) => { });

  } 

  attempMemberSignUp(){
  
    let loader = this.loadingCtrl.create({
      content: "Registering Member..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'picture',
      fileName: 'picture'+(Math.random()*10000000000),
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
      params:{"data":this.memberAccount}
    }
  
    fileTransfer.upload(this.main_uploaded_pic, 'http://virindia.com/dev/index.php/api/User/memberSignUp', options)
      .then((data) => {
          console.log(data+" Uploaded Successfully");
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Registration Successfull!',
            subTitle: 'Please select atleast one image !',
            buttons: ['Dismiss']
          });
          alert.present();
    }, (err) => {
        console.log(err);
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Operation Failed',
          subTitle: err,
          buttons: ['Dismiss']
        });
        alert.present();
    });

    
  }




} //Class ends here.
