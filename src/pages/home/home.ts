import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bg_url: string = "./assets/imgs/viettel_trasau_01.jpg";
  girl_url: string = "./assets/imgs/viettel_trasau_02.png";
  text_url: string = "./assets/imgs/viettel_trasau_03.png";
  phone_number: string = "096.2018.555";
  constructor(public navCtrl: NavController) {

  }

}
