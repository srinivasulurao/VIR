import { Component, ViewChild, enableProdMode } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { FirstRunPage } from '../pages/pages';
import { MainPage } from '../pages/pages';
import { VendorPage } from '../pages/pages';



@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`,
})
export class MyApp {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;

  constructor(private translate: TranslateService,
              private platform: Platform,
              private config: Config,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {

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

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      enableProdMode();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
