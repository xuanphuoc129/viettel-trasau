import { Utils } from "./util";

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

export class Districts {
    code: string = "";
    name: string = "";
    cap: string = "";
    ma_tp: string = "";
    tinh_tp: string = "";

    constructor() {

    }

    parse(data) {
        if (data) {
            if ("code" in data) this.code = data.code;
            if ("name" in data) this.name = data.name;
            if ("cap" in data) this.cap = data.cap;
            if ("ma_tp" in data) this.ma_tp = data.ma_tp;
            if ("tinh_tp" in data) this.tinh_tp = data.tinh_tp;
        }
    }
}

export class Communes {
    code: string = "";
    name: string = "";
    cap: string = "";
    ma_qh: string = "";
    quan_huyen: string = "";
    ma_tp: string = "";
    tinh_tp: string = "";

    constructor() {

    }

    parse(data) {
        if (data) {
            if ("code" in data) this.code = data.code;
            if ("name" in data) this.name = data.name;
            if ("cap" in data) this.cap = data.cap;
            if ("ma_qh" in data) this.ma_qh = data.ma_qh;
            if ("quan_huyen" in data) this.quan_huyen = data.quan_huyen;
            if ("ma_tp" in data) this.ma_tp = data.ma_tp;
            if ("tinh_tp" in data) this.tinh_tp = data.tinh_tp;
        }
    }
}

export class DistrictManager {
    _mCitys: Array<Citys> = [];
    _mDistricts: Array<Districts> = [];
    _mCommunes: Array<Communes> = [];

    constructor() {
    }

    public getCitys() {
        return this._mCitys;
    }

    public getDistrictWithCityCode(code) {
        if (this._mDistricts.length == 0) return [];
        console.log(this._mDistricts);
        
        let res = [];
        res = this._mDistricts.filter(ele => {
            return ele.ma_tp == code;
        })
        return res;
    }


    public getDistrictWithDistrictCode(code) {
        if (this._mCommunes.length == 0) return [];
        let res = [];
        res = this._mCommunes.filter(ele => {
            return ele.ma_qh == code;
        })
        return res;
    }

    onResponseCity(data) {
        this._mCitys = [];

        if (data && data.length > 0) {
            data.forEach(element => {
                let newEle = new Citys();
                newEle.parse(element);
                this._mCitys.push(newEle);
            });
        }

        this._mCitys.sort((a, b) => {
            if (Utils.bodauTiengViet(a.name) < Utils.bodauTiengViet(b.name)) { return -1; }
            if (Utils.bodauTiengViet(a.name) > Utils.bodauTiengViet(b.name)) { return 1; }
            return 0;
        })
    }

    onResponseDistrict(data) {
        this._mDistricts = [];

        if (data && data.length > 0) {
            data.forEach(element => {
                let newEle = new Districts();
                newEle.parse(element);
                this._mDistricts.push(newEle);
            });
        }

        this._mDistricts.sort((a, b) => {
            if (Utils.bodauTiengViet(a.name) < Utils.bodauTiengViet(b.name)) { return -1; }
            if (Utils.bodauTiengViet(a.name) > Utils.bodauTiengViet(b.name)) { return 1; }
            return 0;
        })
    }

    onResponseCommunes(data) {
        this._mCommunes = [];

        if (data && data.length > 0) {
            data.forEach(element => {
                let newEle = new Communes();
                newEle.parse(element);
                this._mCommunes.push(newEle);
            });
        }

        this._mCommunes.sort((a, b) => {
            if (Utils.bodauTiengViet(a.name) < Utils.bodauTiengViet(b.name)) { return -1; }
            if (Utils.bodauTiengViet(a.name) > Utils.bodauTiengViet(b.name)) { return 1; }
            return 0;
        })
    }
}