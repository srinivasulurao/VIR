import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

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
  public result:any='';
  public search_vir_by=""; 
  public buttonText2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
    this.buttonText = "Scan";
    this.loading = false;
  }

  ionViewDidLoad() {
    this.search_vir_by="scanner";
    this.buttonText2="Fetch";
  }

  searchByVirId(){
    var vir_car_no=this['vir_card_id'];
    alert(vir_car_no);
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
      this.result = barcodeData.text;  
      this.loading=false;
      this.buttonText="Scan";

      //this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

}
