import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';

import { OfflineCategoriesPage } from '../pages/offline-categories/offline-categories';
import { OfflineProductDetailsPage } from '../pages/offline-product-details/offline-product-details';
import { TabsPage } from '../pages/tabs/tabs';
import { OfflinePage } from '../pages/offline/offline';
import { OfflineProductsPage } from '../pages/offline-products/offline-products';
import { VendorTabPage } from '../pages/vendor-tab/vendor-tab';
import { StaticContentPage } from '../pages/static-content/static-content';
import { AvailableatPage } from '../pages/availableat/availableat'; 
import { GoogleMapPage } from '../pages/google-map/google-map';
import { OnlineBuyPage } from '../pages/online-buy/online-buy'; 
import { HowItWorksPage } from '../pages/how-it-works/how-it-works'; 
import { SearchFilterPage } from '../pages/search-filter/search-filter'; 

import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy'; 
import { InfringementPolicyPage } from '../pages/infringement-policy/infringement-policy';
import { MemberTermsOfUsePage } from '../pages/member-terms-of-use/member-terms-of-use';
import { PartnerTermsOfUsePage } from '../pages/partner-terms-of-use/partner-terms-of-use'; 
import { OrderHistoryPage } from '../pages/order-history/order-history'; 


//import { SignupTabPage } from '../pages/signup-tab/signup-tab';
//import { LoginTabPage } from '../pages/login-tab/login-tab';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OfflineProductDetailsPage,
    OfflineCategoriesPage,
    OfflineProductsPage,
    VendorTabPage,
    StaticContentPage,
    AvailableatPage,
    GoogleMapPage,
    OnlineBuyPage,
    HowItWorksPage,
    SearchFilterPage,
    PrivacyPolicyPage,
    InfringementPolicyPage,
    MemberTermsOfUsePage,
    PartnerTermsOfUsePage,
    OrderHistoryPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    TabsPage,
    OfflineProductDetailsPage,
    OfflineCategoriesPage,
    OfflineProductsPage,
    VendorTabPage,
    StaticContentPage,
    AvailableatPage,
    GoogleMapPage,
    OnlineBuyPage,
    HowItWorksPage,
    SearchFilterPage,
    PrivacyPolicyPage,
    InfringementPolicyPage,
    MemberTermsOfUsePage,
    PartnerTermsOfUsePage,
    OrderHistoryPage
  ],
  providers: [
    Api,
    User,
    Camera,
    SplashScreen,
    Geolocation,
    StatusBar,
    BarcodeScanner,
    InAppBrowser,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
