import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTabPage } from './login-tab';

@NgModule({
  declarations: [
    LoginTabPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTabPage),
    TranslateModule.forChild()
  ],
})
export class LoginTabPageModule {}
