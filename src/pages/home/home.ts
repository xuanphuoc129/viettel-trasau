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

  items : Array<any> = [
    {title: "siêu rẻ", icon: "viettel-call", subtitle: "Chỉ từ", textbold: "100đ/phút", description: "Combo thoại + data siêu tiết kiệm lên tới 20%" },
    {title: "ưu đãi", icon: "viettel-home", subtitle: "Giao hàng tại nhà", textbold: "miễn phí", description: "Chọn SIM số đẹp 10 số" },
    {title: "tiện lợi", icon: "viettel-money", subtitle: "Dùng trước thanh toán sau", textbold: "hòa mạng đơn giản", description: "- 096.2018.555 - <br> - Cửa hàng viettel - <br> - Ứng dụng My Viettel - <br> - www.shop.viettel.vn -" },
    {title: "linh hoạt", icon: "viettel-payment", subtitle: "Dễ dàng", textbold: "thanh toán", description: "- Thẻ cào viettel - <br> - Qua BankPlus Viettel Pay - <br> - Internet banking - <br> - Tới cửa hàng viettel -" },
  ];

  constructor(public navCtrl: NavController) {

  }

}
