import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from './app-config';
import { AlertController, ToastController, ModalController } from 'ionic-angular';
import { EmailConfig } from '../class/email-config';
import { StorageController } from './storage';
import { Storage } from '@ionic/storage';
import { DistrictManager } from './District';
/*
  Generated class for the AppModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var Email;


@Injectable()
export class AppModuleProvider {

  private mAppConfig: AppConfig = null;
  private mEmailConfig: EmailConfig = null;
  private mStorageController: StorageController;
  private mDistrictManager: DistrictManager = null;

  constructor(
    public mModalController: ModalController,
    public mStorage: Storage,
    public mToastController: ToastController,
    public mAlertController: AlertController,
    public mHttp: Http) {
    this.mDistrictManager = new DistrictManager();
    this.mAppConfig = new AppConfig();
    this.mEmailConfig = new EmailConfig();
    this.mStorageController = new StorageController();
    this.mStorageController.setStorage(this.mStorage);
  }

  public getDistrictManager(): DistrictManager{
    return this.mDistrictManager;
  }

  public onLoadDistrict() {
    // this.onReadFileJson("./assets/data/xa_phuong.json").then((data) => {
    //   if (data) {
    //     this.getDistrictManager().onResponseCommunes(data["xa_phuong"]);
    //   }
    // })
    
    this.onReadFileJson("./assets/data/tinh_tp.json").then((data) => {
      if (data) {
        this.getDistrictManager().onResponseCity(data["tinh_tp"]);
      }
    })
    this.onReadFileJson("./assets/data/quan_huyen.json").then((data) => {
      if (data) {
        this.getDistrictManager().onResponseDistrict(data["quan_huyen"]);
      }
    })
   
  }

  public showModal(page, params?: any, callback?: any): void {
    let modal = this.mModalController.create(page, {params: params ? params : null}, {
      enterAnimation: "fade-in",
      leaveAnimation: "fade-out"
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (callback) {
        callback(data);
      }
    });
  }


  public getStorageController() {
    return this.mStorageController;
  }

  public showToast(params) {
    this.mToastController.create({
      message: params,
      duration: 3000,
      position: "bottom"
    }).present();
  }


  public getAppConfig() {
    return this.mAppConfig;
  }

  private getEmailConfig() {
    return this.mEmailConfig;
  }

  public onLoadAppConfig() {
    return this.onReadFileJson("./assets/data/data.json").then((data) => {
      if (data) {
        this.mAppConfig.onResponseConfig(data);
        this.onResponseConfig();
      }
    })
  }

  public onResponseConfig() {
    let dataConfig = {
      email_receive: "kunlyblack@gmail.com",
      email_sender: "cuahangviettel.vn@gmail.com",
      smtp_server: "smtp.gmail.com",
      username: "cuahangviettel.vn@gmail.com",
      password: "eknpglqnwzyydbur"
    };
    this.getEmailConfig().parseData(dataConfig);
  }

  public onReadFileJson(link: string) {
    return new Promise((resolve, reject) => {

      this.mHttp.get(link).map(res => res.json()).subscribe(data => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    })
  }

  public showSelect(title, array, selected, callback) {
    let alert = this.mAlertController.create();
    alert.setTitle(title);
    array.forEach(element => {
      alert.addInput({
        type: "radio",
        label: element.name,
        value: element.id + "",
        checked: element.id == selected ? true : false
      });
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        callback(data);
      }
    });
    alert.present();
  }

  public getViewNumber(number: number): string {
    let stringNumber: string = "" + number;
    let arrayChar = stringNumber.split("");
    let result = "";
    for (let i = 0; i < arrayChar.length; i++) {
      result = result.concat(arrayChar[i]);
      if ((i + 1) % 3 == 0 && i < arrayChar.length - 1) {
        result = result.concat(",");
      }
    }
    return result;
  }


  public sendEmail(body) {

    Email.send(this.mEmailConfig.email_sender,
      this.mEmailConfig.email_receive,
      "Khách Hàng Trả Sau",
      body,
      this.mEmailConfig.smtp_server,
      this.mEmailConfig.username,
      this.mEmailConfig.password);
  }

}
