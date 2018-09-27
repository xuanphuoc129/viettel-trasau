export class Sims {
    id: string = "";
    numberSim: string = "";
    priceSim: number = 0;
    timeSim: number = 0;
    constructor() { }

    parseData(data) {
        if (data) {
            if ("id" in data) this.id = data.id;
            if ("simNumber" in data) this.numberSim = "0"+data.simNumber;
            if ("price" in data) this.priceSim = data.price;
            if ("time" in data) this.timeSim = data.time;
        }
    }
}