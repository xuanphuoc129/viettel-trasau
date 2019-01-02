import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utils } from '../../providers/app-module/util';

/**
 * Generated class for the SelectAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-address',
  templateUrl: 'select-address.html',
})
export class SelectAddressPage {
  title: string = "Chon";
  items: Array<any> = [];
  selected: string  = "";
  itemsFilter: Array<any> = [];

  searchQuery: string = "";

  constructor(
    public mViewController: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.onLoadParams();
  }

  onInput(){
    if(this.searchQuery.trim() != ''){
      this.items = this.itemsFilter.filter(ele=>{
        return Utils.bodauTiengViet(ele.name).toLowerCase().includes(Utils.bodauTiengViet(this.searchQuery).toLowerCase());
      })
    }else{
      this.items = this.itemsFilter;
    }
  }

  onLoadParams(){
    if(this.navParams.data["params"]){
      let params = this.navParams.get("params");
      if("title" in params){
        this.title = params.title;
      }
  
      if("items" in params){
        this.items = params.items;
        this.itemsFilter = this.items;
      }

      if("selected" in params){
        this.selected = params.selected;
      }
    }
    
  }

  ionViewDidLoad() {
   
  }

  onClickItem(item){
    this.mViewController.dismiss(item.id);
  }

}
