import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { VirWebService } from  '../../app/web-services/vir-webservice';  //This is the webservice.
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the VendorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-home',
  templateUrl: 'vendor-home.html',
})
export class VendorHomePage {

  public carouselImage:any;
  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  public result:any;
  public search_vir_by=""; 
  public buttonText2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public virWS:VirWebService, public alertCtrl: AlertController, public loader: LoadingController) {
    this.buttonText = "Scan";
    this.loading = false;
  }

  ionViewDidLoad() {
    this.search_vir_by="scanner";
    this.buttonText2="Fetch";
  }

  searchByVirId(){
    this.result="";
    var vir_card_no=this['vir_card_id'];

    let loaderCtrl = this.loader.create({
      content: 'Fetching card data ...'
    });

    loaderCtrl.present();

    this.virWS.getCardData("vir_card",vir_card_no).subscribe(response => {
      this.result=response.result;
      console.log(this.result);   
      loaderCtrl.dismiss();
    }); //Ajax Call ends here.
  }

  searchByBarcode(qrcode){

    this.result="";
    let loaderCtrl = this.loader.create({
      content: 'Fetching card data ...'
    });

    loaderCtrl.present();

    this.virWS.getCardData("qrcode",qrcode).subscribe(response => {  
      this.result=response.result;
      loaderCtrl.dismiss();
    }); //Ajax Call ends here.

  }

  public scanQR() {
    this.buttonText = "Loading..";
    this.loading = true;

    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.buttonText = "Scan";
        this.loading = false;
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);  
      this.searchByBarcode(barcodeData.text); 
      this.loading=false;
      this.buttonText="Scan";

      //this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }



}
