import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
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
    StaticContentPage
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
    StaticContentPage
  ],
  providers: [
    Api,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    BarcodeScanner,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
