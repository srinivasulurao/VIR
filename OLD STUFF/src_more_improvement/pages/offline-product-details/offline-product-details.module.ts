import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineProductDetailsPage } from './offline-product-details';

@NgModule({
  declarations: [
    OfflineProductDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineProductDetailsPage),
  ],
})
export class OfflineProductDetailsPageModule {}
