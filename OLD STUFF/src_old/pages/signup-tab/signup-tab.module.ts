import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupTabPage } from './signup-tab';

@NgModule({
  declarations: [
    SignupTabPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupTabPage),
  ],
})
export class SignupTabPageModule {}
