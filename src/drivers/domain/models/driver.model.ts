export default class Driver {
  private readonly id?: number;

  private readonly name: string;

  private readonly lastName: string;

  private readonly phoneNumber: string;

  private readonly driverLicense: string;

  private readonly status?: string;

  private readonly available: boolean;

  constructor(
    name: string,
    lastName: string,
    phoneNumber: string,
    driverLicense: string,
    id?: number,
    available?: boolean,
    status?: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.driverLicense = driverLicense;
    this.status = status;
    this.available = available;
  }
  get getName(): string {
    return this.name;
  }
  get getLastName(): string {
    return this.lastName;
  }
  get getPhoneNumber(): string {
    return this.phoneNumber;
  }
  get getDriverLicense(): string {
    return this.driverLicense;
  }
}
