import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MyaccountPage } from './myaccount';

@NgModule({
  declarations: [
    MyaccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaccountPage),
    TranslateModule.forChild(),
  ],
})
export class MyaccountPageModule {}
