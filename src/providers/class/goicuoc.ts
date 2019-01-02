
export interface Description {
    message: string;
    type: string;
}

export class GoiCuoc {
    id: string = "";
    name: string = "";
    fee: number = 0;
    description: Array<Description> = [];
    constructor() {
    }

    public parseData(data) {
        if (data) {
            if ("id" in data) this.id = data.id;
            if ("name" in data) this.name = data.name;
            if ("price" in data) this.fee = parseInt(data.price);
            this.fee = this.fee * 1000;
            if ("description" in data) this.doParseDescription(data.description);
        }
    }

    public getViewInfo(): string {
        if (this.fee == 0 || this.id == "" || this.name == "") return;
        return this.name + " - " + this.getViewNumber(this.fee) + "đ";
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


    public doParseDescription(data: string) {
        if (data) {
            this.description = [];
            if (data.trim() == "") return;
            if (data.includes("\n")) {
                let array = data.split("\n");
                array.forEach(element => {
                    let arrayelement = element.split("-");
                    // console.log(arrayelement);
                    
                    this.description.push({
                        type: arrayelement[0],
                        message: arrayelement[1]
                    });
                });

            } else {
                let arrayelement = data.split("-");
                this.description.push({
                    type: arrayelement[0],
                    message: arrayelement[1]
                });
            }
        }
    }
}