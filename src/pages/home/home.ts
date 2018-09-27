import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar, Content, ModalController } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Sims } from '../../providers/class/sims';
import { HinhThuc } from '../../providers/class/hinhthuc';
import { GoiCuoc } from '../../providers/class/goicuoc';
import { Utils } from '../../providers/app-module/util';
import { ScrollItems, ScrollController } from '../../providers/app-module/scroll-controller';


export interface Customer {
  name: string;
  address: string;
  phone: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Searchbar) mySearhBar: Searchbar;
  @ViewChild(Content) myContent: Content;
  bg_url: string = "./assets/imgs/viettel_trasau_01.jpg";
  girl_url: string = "./assets/imgs/viettel_trasau_02.png";
  text_url: string = "./assets/imgs/viettel_trasau_03.png";
  type_sim_1: string = "./assets/imgs/viettel-trasau-icon-5.png";
  type_sim_2: string = "./assets/imgs/viettel-trasau-icon-6.png";
  phone_number: string = "096.2018.555";
  mSearchHints: Array<string> = [
    "Sử dụng dấu * đại diện cho một chuỗi số",
    "Để tìm sim bắt đầu bằng 098, quý khách nhập vào 098*",
    "Để tìm sim kết thúc bằng 888, quý khách nhập vào *888",
    "Để tìm sim bắt đầu bằng 098 và kết thúc bằng 888, quý khách nhập vào 098*888",
    "Để tìm sim bên trong có số 888, quý khách nhập vào 888"
  ];
  items: Array<any> = [
    { title: "siêu rẻ", icon: "viettel-call", subtitle: "Chỉ từ", textbold: "100đ/phút", description: "Combo thoại + data siêu tiết kiệm lên tới 20%" },
    { title: "ưu đãi", icon: "viettel-home", subtitle: "Giao hàng tại nhà", textbold: "miễn phí", description: "Chọn SIM số đẹp 10 số" },
    { title: "tiện lợi", icon: "viettel-money", subtitle: "Dùng trước thanh toán sau", textbold: "hòa mạng đơn giản", description: "- 096.2018.555 - <br> - Cửa hàng viettel - <br> - Ứng dụng My Viettel - <br> - www.shop.viettel.vn -" },
    { title: "linh hoạt", icon: "viettel-payment", subtitle: "Dễ dàng", textbold: "thanh toán", description: "- Thẻ cào viettel - <br> - Qua BankPlus Viettel Pay - <br> - Internet banking - <br> - Tới cửa hàng viettel -" },
  ];
  subtitle_gc: string = "(*) Miễn phí thuê bao tháng + Cam kết sử dụng tối thiểu 12 tháng";

  mSims: Array<Sims> = [];
  mGoiCuocs: Array<GoiCuoc> = [];
  mHinhThucs: Array<HinhThuc> = [new HinhThuc(), new HinhThuc()];

  mHinhThucSelected: HinhThuc = new HinhThuc();
  mSimSelected: Sims = new Sims();
  mGoiCuocSelected: GoiCuoc = new GoiCuoc();

  mCustomer: Customer;
  itemIDSelected: number = 1;

  scrollItems: ScrollItems;

  mScrollController: ScrollController;
  constructor(
    public mModalController: ModalController,
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController) {
    this.mCustomer = {
      name: "",
      address: "",
      phone: ""
    };


    this.mScrollController = new ScrollController();
  }
  onClickSignUp() {
    this.scrollTo(this.getScrollTopById("block2ID"));
  }

  onClickSim(item) {
    this.mSimSelected = item;
    this.scrollTo(this.getScrollTopById("block4ID"));
  }

  onClickHinhThuc(number: number) {
    this.mHinhThucSelected = this.mHinhThucs[number];
    if (this.mHinhThucSelected.id == 1) {
      this.scrollTo(this.getScrollTopById("block3ID"));
    } else {
      this.mSimSelected = new Sims();
      this.scrollTo(this.getScrollTopById("block4ID"));
    }
  }

  scrollTo(scrollTop) {
    this.myContent.scrollTo(0, scrollTop, 200);
  }

  getScrollTopById(id) {
    let element = document.getElementById(id);

    if (element) {
      return element.offsetTop;
    } else {
      return 0;
    }
  }

  isShowHintSearch = false;
  ionViewDidLoad() {
    this.mySearhBar.ionFocus.asObservable().subscribe(() => {
      this.isShowHintSearch = true;
    })
    this.mySearhBar.ionBlur.asObservable().subscribe(() => {
      this.isShowHintSearch = false;
    })
    this.onLoadData();
    this.scrollItems = new ScrollItems("rowitemID");
    this.scrollItems.createListener();
    this.scrollItems.setScrollEndListener(() => {
      let index = this.scrollItems.getCurrentScrollLeftFocusElement(true);
      this.itemIDSelected = index + 1;
      this.mScrollController.doScrollLeft("rowitemID", (this.itemIDSelected - 1) * this.scrollItems.mItemWidth);
    })
  }

  onLoadData() {
    this.mAppModule.onLoadAppConfig().then(() => {
      this.onLoadSims();
      this.onLoadGoiCuoc();
      this.onLoadItems();
      this.onLoadPhoneNumber();
      this.onLoadSearchHint();
      this.onLoadGoiCuoc();
      this.onLoadHinhThuc();
      this.subtitle_gc = this.mAppModule.getAppConfig().get("subtitle_gc");
      this.bg_url = this.mAppModule.getAppConfig().get("bg_url");
      this.text_url = this.mAppModule.getAppConfig().get("text_url");
    })
  }

  onLoadHinhThuc() {
    this.mHinhThucs = this.mAppModule.getAppConfig().get("hinhthuc");
  }

  onLoadItems() {
    this.items = this.mAppModule.getAppConfig().get("items");
  }

  onLoadPhoneNumber() {
    this.phone_number = this.mAppModule.getAppConfig().get("phone_number");
  }

  onLoadSearchHint() {
    this.mSearchHints = this.mAppModule.getAppConfig().get("search_hints");
  }

  onLoadSims() {
    let link = this.mAppModule.getAppConfig().get("sims");
    this.mAppModule.onReadFileJson(link).then(
      data => {
        if (data) {
          let array = data["ds_sim"];
          this.mSims = [];
          array.forEach(element => {
            let newSim = new Sims();
            newSim.parseData(element);
            this.mSims.push(newSim);
          });
        }
      }
    ).catch(err => {

    })
  }

  onLoadGoiCuoc() {
    let link = this.mAppModule.getAppConfig().get("goicuoc");
    this.mAppModule.onReadFileJson(link).then(
      data => {
        if (data) {
          let array = data["ds_goicuoc"];
          this.mGoiCuocs = [];
          array.forEach(element => {
            let newGoiCuoc = new GoiCuoc();
            newGoiCuoc.parseData(element);
            this.mGoiCuocs.push(newGoiCuoc);
          });
        }
      }
    ).catch(err => {

    })
  }

  onClickGoiCuoc(item) {
    this.mGoiCuocSelected = item;
    this.scrollTo(this.getScrollTopById("block5ID"));
  }

  onClickSelectHinhthuc() {
    let array = [];
    this.mHinhThucs.forEach(element => {
      array.push({
        id: element.id,
        name: element.name
      });
    });
    this.mAppModule.showSelect("Chọn hình thức", array, this.mHinhThucSelected.id, (id) => {
      if (id) {
        let index = this.mHinhThucs.findIndex(ele => {
          return ele.id == id;
        });
        if (index > -1) {
          this.mHinhThucSelected = this.mHinhThucs[index];
        }
      }
    })
  }
  onClickSelectSim() {
    let array = [];
    this.mSims.forEach(elemnt => {
      array.push({
        id: elemnt.id,
        name: elemnt.numberSim
      });
    });
    this.mAppModule.showSelect("Chọn Sim", array, this.mSimSelected.id, (id) => {
      if (id) {
        let index = this.mSims.findIndex(ele => {
          return ele.id == id;
        });
        if (index > -1) {
          this.mSimSelected = this.mSims[index];
        }
      }
    })
  }

  onClickSelectGoiCuoc() {
    let array = [];
    this.mGoiCuocs.forEach(elemnt => {
      array.push({
        id: elemnt.id,
        name: elemnt.name
      });
    });
    this.mAppModule.showSelect("Chọn gói cước", array, this.mGoiCuocSelected.id, (id) => {
      if (id) {
        let index = this.mGoiCuocs.findIndex(ele => {
          return ele.id == id;
        });
        if (index > -1) {
          this.mGoiCuocSelected = this.mGoiCuocs[index];
        }
      }
    })
  }

  checkForm() {

    if (this.mCustomer.name.trim() == '') {
      this.isRequireName = false
    } else {
      this.isRequireName = true;
    }

    if (this.mCustomer.phone.trim() == '' || !Utils.isValidPhone(this.mCustomer.phone)) {
      this.isRequirePhone = false;
    } else {
      this.isRequirePhone = true;
    }

    if (this.mCustomer.address.trim() == '') {
      this.isRequireAdress = false;
    } else {
      this.isRequireAdress = true;
    }

  }

  isRequireName = true;
  isRequirePhone = true;
  isRequireAdress = true;
  onClickAccept() {
    this.checkForm();
    if (!this.isRequireName || !this.isRequirePhone || !this.isRequireAdress) {
      return;
    }
    if(this.mHinhThucSelected.id == -1){
      this.mAppModule.showToast("Bạn chưa chọn hình thức");
      return;
    }

    if(this.mHinhThucSelected.id == 1 && this.mSimSelected.id == ""){
      this.mAppModule.showToast("Bạn chưa chọn sim");
      return;
    }

    if(this.mGoiCuocSelected.id == ""){
      this.mAppModule.showToast("Bạn chưa chọn gói cước");
      return;
    }

    let body = this.createBodyEmail();
    this.mAppModule.sendEmail(body);
    this.showModal();
  }


  showModal() {
    let modal = this.mModalController.create("MailDonePopupPage", { params: this.mCustomer.phone });
    modal.present();
    modal.onDidDismiss(() => {
      this.isRequireName = true;
      this.isRequirePhone = true;
      this.isRequireAdress = true;
      this.mCustomer = {
        phone: "",
        name: "",
        address: ""
      };
      this.mSimSelected = new Sims();
      this.mHinhThucSelected = new HinhThuc();
      this.mGoiCuocSelected = new GoiCuoc();
    })
  }

  createBodyEmail() {
    let l1 = "Hình thức: " + this.mHinhThucSelected.name.toUpperCase() + "\r \n" + ";";
    let l2 = "Sim : " + this.mSimSelected.numberSim + "-" + this.mSimSelected.priceSim + "\r \n" + ";";
    let l3 = "Gói cước : " + this.mGoiCuocSelected.name + "\r \n" + ";";

    let l4 = "Họ tên: " + this.mCustomer.name + "\r \n" + ";";
    let l5 = "Điện thoại: " + this.mCustomer.phone + "\r \n" + ";";
    let l6 = "Địa chỉ: " + this.mCustomer.address + "\r \n" + ";";

    return l1 + l2 + l3 + l4 + l5 + l6;
  }

  onClickTab(item) {
    this.itemIDSelected = item.id;
    let element = document.getElementById("rowitemID");
    if (element) {
      let scrollLeft = element.children.item(0).clientWidth * (this.itemIDSelected - 1);

      this.mScrollController.doScrollLeft("rowitemID", scrollLeft);
    }
  }
}
