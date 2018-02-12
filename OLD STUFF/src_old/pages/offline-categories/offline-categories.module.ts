import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineCategoriesPage } from './offline-categories';

@NgModule({
  declarations: [
    OfflineCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineCategoriesPage),
  ],
})
export class OfflineCategoriesPageModule {}
