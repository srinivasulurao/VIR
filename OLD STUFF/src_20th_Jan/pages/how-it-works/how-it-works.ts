import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HowItWorksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-how-it-works',
  templateUrl: 'how-it-works.html',
})
export class HowItWorksPage {

  public slides:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
  }

  loadHowItWorks(){
    this.slides = [
      {
        description: 'Honouring Service & Sacrifice',
        image: 'assets/img/hiw_1.png',
      },
      {
        description: 'Serving the Armed Forces Community',
        image: 'assets/img/hiw_2.png',
      }
    ];

  }

  ionViewDidLoad() {

    this.loadHowItWorks();

    console.log('ionViewDidLoad HowItWorksPage');
  }

}
