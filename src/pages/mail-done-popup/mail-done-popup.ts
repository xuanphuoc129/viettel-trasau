import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MailDonePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mail-done-popup',
  templateUrl: 'mail-done-popup.html',
})
export class MailDonePopupPage {
  phone: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.onLoadParams();
  }

  onLoadParams(){
    if(this.navParams.data["params"]){
      this.phone = this.navParams.get("params");
    }
  }

  ionViewDidLoad() {
   
  }

}
