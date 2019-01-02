import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Searchbar, Content, ModalController, Platform, AlertController } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { Sims } from '../../providers/class/sims';
import { HinhThuc } from '../../providers/class/hinhthuc';
import { GoiCuoc } from '../../providers/class/goicuoc';
import { Utils } from '../../providers/app-module/util';
import { ScrollItems, ScrollController } from '../../providers/app-module/scroll-controller';
import { Districts, Communes } from '../../providers/app-module/District';


export interface Customer {
    name: string;
    address: string;
    phone: string;
}

export class Citys {
    code: string = "";
    name: string = "";
    cap: string = "";
    constructor() {

    }

    parse(data) {
        if (data) {
            if ("code" in data) this.code = data.code;
            if ("name" in data) this.name = data.name;
            if ("cap" in data) this.cap = data.cap;
        }
    }
}


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // @ViewChild(Searchbar) mySearhBar: Searchbar;
    @ViewChild(Content) myContent: Content;
    bg_url: string = "./assets/imgs/viettel_trasau_01.jpg";
    girl_url: string = "./assets/imgs/viettel_trasau_02.png";
    text_url: string = "./assets/imgs/viettel_trasau_03.png";
    type_sim_1: string = "./assets/imgs/viettel-trasau-icon-5.png";
    type_sim_2: string = "./assets/imgs/viettel-trasau-icon-6.png";
    phone_number: string = "096.2018.555";
    phi_chuyen_doi: string = "35,000 đ";
    phi_dang_ky: string = "25,000 đ";
    phone_call: string = "0962018555";
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

    // mSims: Array<Sims> = [];
    // mSimsFillter: Array<Sims> = [];
    // mSimSelected: Sims = new Sims();

    mGoiCuocs: Array<GoiCuoc> = [];
    mHinhThucs: Array<HinhThuc> = [new HinhThuc(), new HinhThuc()];

    mHinhThucSelected: HinhThuc = new HinhThuc();
    mGoiCuocSelected: GoiCuoc = new GoiCuoc();

    mCustomer: Customer;

    itemIDSelected: number = 1;

    scrollItems: ScrollItems;

    mScrollController: ScrollController;

    searchQuery: string = "";

    isIosMobile: boolean = false;

    mCitys: Array<Citys> = [];

    _cityCode: string = "";
    cityName: string = "";

    mCityCode: string = "-1";
    mCityName: string = "";
    mDistrictCode: string = "-1";
    mDistrictName: string = "";
    mCommuneCode: string = "-1";
    mCommuneName: string = "";

    mDistrict: Array<Districts> = [];
    mCommunes: Array<Communes> = [];

    mNumberSim: number = 1;
    mTypePerson: number = 1;
    constructor(
        public mAlertController: AlertController,
        public mPlatform: Platform,
        public mDectectChagne: ChangeDetectorRef,
        public mModalController: ModalController,
        public mAppModule: AppModuleProvider,
        public navCtrl: NavController) {
        this.mCustomer = {
            name: "",
            address: "",
            phone: ""
        };

        this.mPlatform.ready().then(() => {
            if (this.mPlatform.is("ios")) {
                this.isIosMobile = true;
            }
        })

        this.mScrollController = new ScrollController();
    }

    onClickTypePerson(type) {
        this.mTypePerson = type;
    }

    onClickShowInputCitys() {
        let array = [];
        this.mCitys.forEach(ele => {
            array.push({
                id: ele.code,
                name: ele.name
            });
        })


        this.mAppModule.showSelect("Chọn nơi cấp chứng minh thư", array, this._cityCode, (code) => {
            if (code) {
                if (this._cityCode != code) {
                    this._cityCode = code;
                    this.onLoadGetCityName();
                }
            }
        })
    }

    onLoadGetCityName() {
        let city = this.mCitys.find(ele => {
            return ele.code == this._cityCode;
        })
        if (city) {
            this.cityName = city.name;
        }
    }

    onClickShowInputName() {
        let alert = this.mAlertController.create({
            title: "Họ và tên",
            inputs: [
                {
                    type: "text",
                    name: "name",
                    value: this.mCustomer.name,
                    placeholder: "Nhập họ và tên"
                }
            ],
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        this.mCustomer.name = data.name;
                    }
                }
            ]
        });
        alert.present();

    }

    onClickShowInputNumberSim() {
        let alert = this.mAlertController.create({
            title: "Số lượng sim đăng ký",
            inputs: [
                {
                    type: "text",
                    name: "name",
                    value: this.mNumberSim + "",
                    placeholder: "Nhập số lượng sim đăng ký"
                }
            ],
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        this.mNumberSim = parseInt(data.name);
                    }
                }
            ]
        });
        alert.present();
    }

    onClickShowInputPhone() {
        let alert = this.mAlertController.create({
            title: "Số điện thoại",
            inputs: [
                {
                    type: "number",
                    name: "phone",
                    value: this.mCustomer.phone,
                    placeholder: "Nhập số điện thoại liên hệ"
                }
            ],
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        this.mCustomer.phone = data.phone;
                    }
                }
            ]
        });
        alert.present();

    }

    onClickShowInputAddress() {
        let alert = this.mAlertController.create({
            title: "Địa chỉ liên hệ",
            inputs: [
                {
                    type: "text",
                    name: "address",
                    value: this.mCustomer.address,
                    placeholder: "Số nhà, tên đường, tổ/thôn"
                }
            ],
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        this.mCustomer.address = data.address;
                    }
                }
            ]
        });
        alert.present();

    }

    // doSearch() {
    //     if (this.searchQuery.trim() != "") {
    //         this.isShowHintSearch = false;
    //         this.mSims = this.mSimsFillter.filter(sim => {
    //             return sim.numberSim.includes(this.searchQuery);
    //         })
    //     } else {
    //         this.isShowHintSearch = true;
    //         this.mSims = this.mSimsFillter;
    //     }
    // }

    onClickSignUp() {
        this.scrollTo(this.getScrollTopById("block2ID"));
    }

    // onClickSim(item) {
    //     this.mSimSelected = item;
    //     if (this.mHinhThucSelected.id == -1) {
    //         this.scrollTo(this.getScrollTopById("block2ID"));
    //     } else if (this.mGoiCuocSelected.id == "") {
    //         this.scrollTo(this.getScrollTopById("block4ID"));
    //     } else {
    //         this.scrollTo(this.getScrollTopById("block5ID"));
    //     }
    // }

    onClickHinhThuc(number: number) {
        this.mHinhThucSelected = this.mHinhThucs[number];
        if (this.mHinhThucSelected.id == 1) {
            this.scrollTo(this.getScrollTopById("block5ID"));
            // alert("Đăng ký mua sim trả sau mới vui lòng liên hệ " + this.phone_call + " để được hỗ trợ");
            // if (this.mSimSelected.id == "") {
            //     // this.scrollTo(this.getScrollTopById("block3ID"));
            // } else if (this.mGoiCuocSelected.id == "") {
            //     this.scrollTo(this.getScrollTopById("block4ID"));
            // } else {
            //     this.scrollTo(this.getScrollTopById("block5ID"));
            // }
        } else {
            // this.mSimSelected = new Sims();
            if (this.mGoiCuocSelected && this.mGoiCuocSelected.id != '') {
                this.scrollTo(this.getScrollTopById("block5ID"));
            } else {
                this.scrollTo(this.getScrollTopById("block4ID"));
            }
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

    // isShowHintSearch = false;
    mScrollTop: number = 0;
    ionViewDidLoad() {
        // this.mySearhBar.ionFocus.asObservable().subscribe(() => {
        //     this.isShowHintSearch = true;
        // })
        // this.mySearhBar.ionBlur.asObservable().subscribe(() => {
        //     this.isShowHintSearch = false;
        // })
        this.onLoadData();
        this.myContent.ionScroll.asObservable().subscribe(() => {
            this.mScrollTop = this.myContent.scrollTop;
            this.mDectectChagne.detectChanges();
        })

    }

    onLoadData() {
        this.mAppModule.onLoadDistrict();

        this.mAppModule.onLoadAppConfig().then(() => {
            // this.onLoadSims();
            this.onLoadGoiCuoc();
            this.onLoadItems();
            this.onLoadPhoneNumber();
            this.onLoadSearchHint();
            this.onLoadGoiCuoc();
            this.onLoadHinhThuc();
            this.subtitle_gc = this.mAppModule.getAppConfig().get("subtitle_gc");
            this.bg_url = this.mAppModule.getAppConfig().get("bg_url");
            this.text_url = this.mAppModule.getAppConfig().get("text_url");
            this.phi_chuyen_doi = this.mAppModule.getAppConfig().get("phi_chuyen_doi");
            this.phi_dang_ky = this.mAppModule.getAppConfig().get("phi_dang_ky");

        })

        setTimeout(() => {
            this.mCitys = this.mAppModule.getDistrictManager().getCitys();
        }, 1000);

    }

    onLoadHinhThuc() {
        this.mHinhThucs = this.mAppModule.getAppConfig().get("hinhthuc");
    }

    onLoadItems() {
        this.items = this.mAppModule.getAppConfig().get("items");
    }

    onLoadPhoneNumber() {
        this.phone_number = this.mAppModule.getAppConfig().get("phone_number");
        this.phone_call = this.phone_number;
        this.phone_call = this.phone_call.replace(".", '');
        this.phone_call = this.phone_call.replace(".", '');
        console.log(this.phone_call);

    }

    onLoadSearchHint() {
        this.mSearchHints = this.mAppModule.getAppConfig().get("search_hints");
    }

    // onLoadSims() {
    //     let link = this.mAppModule.getAppConfig().get("sims");
    //     this.mAppModule.onReadFileJson(link).then(
    //         data => {
    //             if (data) {
    //                 let array = data["ds_sim"];
    //                 this.mSims = [];
    //                 array.forEach(element => {
    //                     let newSim = new Sims();
    //                     newSim.parseData(element);
    //                     this.mSims.push(newSim);
    //                 });
    //                 this.mSimsFillter = this.mSims;
    //             }
    //         }
    //     ).catch(err => {

    //     })
    // }

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

        if (this.mHinhThucSelected.id == -1) {
            this.scrollTo(this.getScrollTopById("block2ID"));
        } else {
            this.scrollTo(this.getScrollTopById("block5ID"));
        }
    }


    checkForm() {

        if (this.mCustomer.name.trim() == '') {
            this.isRequireName = false;
            return false;
        } else {
            this.isRequireName = true;
        }

        if (this.mCustomer.phone.trim() == '' || !Utils.isValidPhone(this.mCustomer.phone) || this.mCustomer.phone.length < 9 || this.mCustomer.phone.length > 11 || parseInt(this.mCustomer.phone) < 299999999) {
            this.isRequirePhone = false;
            return false;
        } else {
            this.isRequirePhone = true;
        }

        if (this.mCustomer.address.trim() == '') {
            this.isRequireAdress = false;
            return false;
        } else {
            this.isRequireAdress = true;
        }

        return true;
    }

    isRequireName = true;
    isRequirePhone = true;
    isRequireAdress = true;
    isClickAccept: boolean = false;
    onClickAccept() {
        console.log(1);
        if (this.isClickAccept) return;
        this.isClickAccept = true;
        let check = this.checkForm();
        if (!check) {
            this.isClickAccept = false;
            return;
        }
        if (!this.isRequireName || !this.isRequirePhone || !this.isRequireAdress) {
            this.isClickAccept = false;
            return;
        }
        if (this.mHinhThucSelected.id == -1) {
            this.isClickAccept = false;
            this.mAppModule.showToast("Bạn chưa chọn hình thức");
            return;
        }

        if (this.mCityCode == "-1" || this.mDistrictCode == "-1" || this.mCommuneCode == "-1") {
            this.isClickAccept = false;
            this.mAppModule.showToast("Bạn chưa chọn địa chỉ");
            return;
        }

        // if (this.mHinhThucSelected.id == 1 && this.mSimSelected.id == "") {
        //     this.isClickAccept = false;

        //     this.mAppModule.showToast("Bạn chưa chọn sim");
        //     return;
        // }

        if (this.mGoiCuocSelected.id == "") {
            this.mAppModule.showToast("Bạn chưa chọn gói cước");
            this.isClickAccept = false;
            return;
        }

        this.mAppModule.getStorageController().getDataFromStorage("time_send").then((res) => {
            if (res) {
                console.log(res);

                let time = parseInt(res);
                let nowTime = new Date().getTime();
                let distance = nowTime - time;
                if (Math.floor(distance / 60000) < 3) {
                    alert("Vui lòng đăng ký lại sau ít phút hoặc liên hệ hotline " + this.phone_number + " để được hỗ trợ");
                    this.isRequireName = true;
                    this.isRequirePhone = true;
                    this.isRequireAdress = true;
                    this.mCustomer = {
                        phone: "",
                        name: "",
                        address: ""
                    };
                    // this.mSimSelected = new Sims();
                    this.mHinhThucSelected = new HinhThuc();
                    this.mGoiCuocSelected = new GoiCuoc();
                    this.isClickAccept = false;
                } else {
                    this.sendMail();
                }
            } else {
                this.sendMail();
            }
        });

    }


    showModal() {
        let modal = this.mModalController.create("MailDonePopupPage", { params: this.mCustomer.phone });
        modal.present();
        modal.onDidDismiss(() => {

        })
    }

    createBodyEmail() {
        let l1 = "Hình thức: " + this.mHinhThucSelected.name.toUpperCase() + "\r \n" + ";";
        let l3 = "Gói cước : " + this.mGoiCuocSelected.name + "\r \n" + ";";

        let l4 = "Họ tên: " + this.mCustomer.name + "\r \n" + ";";
        let l5 = "Điện thoại: " + this.mCustomer.phone + "\r \n" + ";";

        let l9 = "Số lượng sim: " + this.mNumberSim + ";";

        let l10 = "Loại khách hàng: " + (this.mTypePerson == 1 ? "Cá nhân" : "Doanh nghiệp") + ";";

        let l6 = "Địa chỉ: " + this.mCustomer.address + "\r \n" + ";";

        let l8 = this.mCommuneName + ", " + this.mDistrictName + ", " + this.mCityName + ";";

        if (this.mHinhThucSelected.id == 1) {
            return l1 + l3 + l4 + l5 + l9 + l10 + l6 + l8;
        } else {
            return l1 + l4 + l5 + l6 + l8;
        }
    }

    sendMail() {
        let body = this.createBodyEmail();
        this.mAppModule.sendEmail(body);
        this.showModal();
        this.isRequireName = true;
        this.isRequirePhone = true;
        this.isRequireAdress = true;
        this.mCustomer = {
            phone: "",
            name: "",
            address: ""
        };
        this.cityName = "";
        this._cityCode = "";
        this.mCityName = "";
        this.mCityCode = "-1";
        this.mDistrictCode = "-1";
        this.mDistrictName = "";
        this.mCommuneCode = "-1";
        this.mCommuneName = "";
        // this.mSimSelected = new Sims();
        this.mHinhThucSelected = new HinhThuc();
        this.mGoiCuocSelected = new GoiCuoc();
        this.isClickAccept = false;

    }

    onClickTab(item) {
        this.itemIDSelected = item.id;
        let element = document.getElementById("rowitemID");
        if (element) {
            let scrollLeft = element.children.item(0).clientWidth * (this.itemIDSelected - 1);

            this.mScrollController.doScrollLeft("rowitemID", scrollLeft);
        }
    }

    onSwipe(e) {
        let direction = e.direction;
        if (direction == 2) {
            let id = this.itemIDSelected + 1;
            if (id < 5) {
                this.onClickTab({ id: id });
            }
        } else if (direction == 4) {
            let id = this.itemIDSelected - 1;
            if (id > 0) {
                this.onClickTab({ id: id });
            }
        }
    }

    onClickCall() {
        let element = document.createElement("a");
        element.href = "tel:" + this.phone_call;
        document.body.appendChild(element);
        element.click();
    }

    scrollToAddress() {
        this.myContent.scrollTo(null, this.mScrollTop + 200, 200);
        // this.scrollTo(this.getScrollTopById("addressID"));
    }
    scrollToName() {
        this.myContent.scrollTo(null, this.mScrollTop, 200);
    }
    scrollToPhone() {
        this.myContent.scrollTo(null, this.mScrollTop, 200);
    }

    onClickCity() {
        let array = [];
        this.mCitys.forEach(element => {
            array.push({
                id: element.code,
                name: element.name
            });
        });



        this.mAppModule.showModal("SelectAddressPage", { title: "Chọn tỉnh/thành phố", items: array, selected: this.mCityCode }, (id) => {
            if (id) {
                console.log(id);

                if (id != this.mCityCode) {
                    this.mDistrictCode = "-1";
                    this.mDistrictName = "";
                    this.mCommuneCode = "-1";
                    this.mCommuneName = "";

                    this.mCityCode = id;
                    this.onGetCityName();
                    this.mDistrict = this.mAppModule.getDistrictManager().getDistrictWithCityCode(this.mCityCode);
                }
            }
        });
        // this.mAppModule.showSelect("Chọn tỉnh/thành phố", array, this.mCityCode, (id) => {
        //     if (id) {
        //         if (id != this.mCityCode) {
        //             this.mDistrictCode = "-1";
        //             this.mDistrictName = "";
        //             this.mCommuneCode = "-1";
        //             this.mCommuneName = "";

        //             this.mCityCode = id;
        //             this.onGetCityName();
        //             this.mDistrict = this.mAppModule.getDistrictManager().getDistrictWithCityCode(this.mCityCode);
        //         }
        //     }
        // })
    }

    onGetCityName() {
        let city = this.mCitys.find(ele => {
            return ele.code == this.mCityCode;
        })

        if (city) {
            this.mCityName = city.name;
        }
    }


    onGetDisctrictName() {
        let city = this.mDistrict.find(ele => {
            return ele.code == this.mDistrictCode;
        })

        if (city) {
            this.mDistrictName = city.cap + " " + city.name;
        }
    }
    onGetCommuneName() {
        let city = this.mCommunes.find(ele => {
            return ele.code == this.mCommuneCode;
        })

        if (city) {
            this.mCommuneName = city.cap + " " + city.name;
        }
    }



    onClickDistrict() {
        if (this.mCityCode == "-1") {
            alert("Bạn chưa chọn tỉnh/thành phố");
            return;
        }
        let array = [];
        this.mDistrict.forEach(element => {
            array.push({
                id: element.code,
                name: element.cap + " " + element.name
            });
        });



        this.mAppModule.showModal("SelectAddressPage", { title: "Chọn quận huyện", items: array, selected: this.mDistrictCode }, (id) => {
            if (id) {
                if (id != this.mDistrictCode) {
                    this.mCommuneCode = "-1";
                    this.mCommuneName = "";

                    this.mDistrictCode = id;
                    this.onGetDisctrictName();
                    this.mCommunes = this.mAppModule.getDistrictManager().getDistrictWithDistrictCode(this.mDistrictCode);
                }
            }
        });

    }

    onClickCommune() {
        if (this.mDistrictCode == "-1") {
            alert("Bạn chưa chọn quận huyện");
            return;
        }
        let array = [];
        this.mCommunes.forEach(element => {
            array.push({
                id: element.code,
                name: element.cap + " " + element.name
            });
        });

        this.mAppModule.showModal("SelectAddressPage", { title: "Chọn phường xã", items: array, selected: this.mCommuneCode }, (id) => {
            if (id) {
                this.mCommuneCode = id;
                this.onGetCommuneName();
            }
        });

       

    }

    onClickAddFab(){
        this.mAppModule.showModal("MenuShowModalPage",null);
    }
}
