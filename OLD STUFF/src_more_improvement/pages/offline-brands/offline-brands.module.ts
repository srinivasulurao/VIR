import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineBrandsPage } from './offline-brands';

@NgModule({
  declarations: [
    OfflineBrandsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineBrandsPage),
  ],
})
export class OfflineBrandsPageModule {}
