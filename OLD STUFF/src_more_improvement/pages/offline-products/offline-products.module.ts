import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineProductsPage } from './offline-products';

@NgModule({
  declarations: [
    OfflineProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineProductsPage),
  ],
})
export class OfflineProductsPageModule {}
