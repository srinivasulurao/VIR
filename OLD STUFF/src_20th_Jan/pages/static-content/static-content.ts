import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StaticContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-static-content',
  templateUrl: 'static-content.html',
})
export class StaticContentPage {

  public pageName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageName= this.navParams.get('page'); 

    //console.log(this.pageName);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaticContentPage');
  }

}
