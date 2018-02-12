import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorTabPage } from './vendor-tab';

@NgModule({
  declarations: [
    VendorTabPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorTabPage),
  ],
})
export class VendorTabPageModule {}
