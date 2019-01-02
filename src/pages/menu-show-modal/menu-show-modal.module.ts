import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuShowModalPage } from './menu-show-modal';

@NgModule({
  declarations: [
    MenuShowModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuShowModalPage),
  ],
})
export class MenuShowModalPageModule {}
