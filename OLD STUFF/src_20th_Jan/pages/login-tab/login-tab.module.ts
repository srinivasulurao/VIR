import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTabPage } from './login-tab';

@NgModule({
  declarations: [
    LoginTabPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTabPage),
  ],
})
export class LoginTabPageModule {}
