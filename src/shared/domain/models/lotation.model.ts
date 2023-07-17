export default class LocationModel {
  public readonly lattitude: string;

  public readonly longitude: string;

  constructor(lattitude: string, longitude: string) {
    this.lattitude = lattitude;
    this.longitude = longitude;
  }
}
