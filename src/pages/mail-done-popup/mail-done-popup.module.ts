import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MailDonePopupPage } from './mail-done-popup';

@NgModule({
  declarations: [
    MailDonePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(MailDonePopupPage),
  ],
})
export class MailDonePopupPageModule {}
