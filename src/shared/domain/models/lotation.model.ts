export default class LocationModel {

    public readonly lattitude: string;
  
    public readonly longtude: string;

    constructor(
        lattitude: string,
        longtude: string,
    ){
        this.lattitude = lattitude;
        this.longtude = longtude;
    }
}