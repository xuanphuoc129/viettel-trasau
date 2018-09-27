import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from './app-config';
import { AlertController, ToastController } from 'ionic-angular';
import { EmailConfig } from '../class/email-config';
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

  constructor(
    public mToastController: ToastController,
    public mAlertController: AlertController,
    public mHttp: Http) {
    this.mAppConfig = new AppConfig();
    this.mEmailConfig = new EmailConfig();
  }

  public showToast(params){
    this.mToastController.create({
      message: params,
      duration: 3000,
      position : "bottom"
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
        this.onResponseConfig(data);
      }
    })
  }

  public onResponseConfig(data) {
    this.getEmailConfig().parseData(data["config_server_email"]);
  }

  public onReadFileJson(link: string) {
    return new Promise((resolve, reject) => {
      let newheaders = new Headers();
      newheaders.append('Content-type', 'application/json; charset=utf-8');
      this.mHttp.get(link, {
        headers: newheaders
      }).map(res => res.json()).subscribe(data => {
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
    alert.addButton('Cancel');
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
      "Khách hàng đăng ký sim trả sau",
      body,
      this.mEmailConfig.smtp_server,
      this.mEmailConfig.username,
      this.mEmailConfig.password);
  }

}
