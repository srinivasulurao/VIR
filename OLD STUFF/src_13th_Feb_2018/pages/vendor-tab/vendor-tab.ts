import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab5Root } from '../pages';
import { Tab4Root } from '../pages';

/**
 * Generated class for the VendorTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-tab',
  templateUrl: 'vendor-tab.html',
})
export class VendorTabPage {

  Tab5Root: any = Tab5Root;
  tab4Root: any = Tab4Root;

  tab1Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad VendorTabPage');
  }

}
