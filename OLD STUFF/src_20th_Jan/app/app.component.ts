import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
//import { VirWebService } from './web-services/vir-webservice'; //This is the vir webservice.

//import { Settings } from '../providers/providers';
import { FirstRunPage } from '../pages/pages';
import { MainPage } from '../pages/pages';
import { VendorPage } from '../pages/pages';

//Declare all the page here.
//import { TabsPage } from "../pages/tabs/tabs";
/*import { MemberHomePage } from '../pages/member-home/member-home';
import { OfflinePage } from '../pages/offline/offline';
import { OnlinePage } from '../pages/online/online';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { OfflineCategoriesPage } from '../pages/offline-categories/offline-categories';
import { OfflineProductsPage } from '../pages/offline-products/offline-products';
import { OfflineBrandsPage } from '../pages/offline-brands/offline-brands';
import { StaticContentPage } from '../pages/static-content/static-content';
import { AvailableatPage } from '../pages/availableat/availableat';
import { GoogleMapPage } from  '../pages/google-map/google-map' ;
import { OnlineBuyPage } from '../pages/online-buy/online-buy';
import { HowItWorksPage } from '../pages/how-it-works/how-it-works';
import { SearchFilterPage } from '../pages/search-filter/search-filter';

import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { InfringementPolicyPage } from '../pages/infringement-policy/infringement-policy';
import { MemberTermsOfUsePage } from '../pages/member-terms-of-use/member-terms-of-use';
import { PartnerTermsOfUsePage } from '../pages/partner-terms-of-use/partner-terms-of-use';
import { OrderHistoryPage } from '../pages/order-history/order-history';*/
//import { VendorTabPage } from '../pages/vendor-tab/vendor-tab';


@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`,
  //providers:[VirWebService]
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  constructor(private translate: TranslateService, platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

    if(localStorage.getItem('userid')){
      if(localStorage.getItem('roleid')=='1'){
        this.rootPage = MainPage;
      }else if(localStorage.getItem('roleid')=='2'){
        this.rootPage = VendorPage;
      }else{
        this.rootPage = FirstRunPage;
      }
    }else{
      this.rootPage = FirstRunPage;
    }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
