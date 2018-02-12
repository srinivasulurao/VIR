import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloseAccountPage } from './close-account';

@NgModule({
  declarations: [
    CloseAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CloseAccountPage),
  ],
})
export class CloseAccountPageModule {}
