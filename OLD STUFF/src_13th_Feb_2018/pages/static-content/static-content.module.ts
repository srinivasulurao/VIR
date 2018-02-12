import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaticContentPage } from './static-content';

@NgModule({
  declarations: [
    StaticContentPage,
  ],
  imports: [
    IonicPageModule.forChild(StaticContentPage),
  ],
})
export class StaticContentPageModule {}
