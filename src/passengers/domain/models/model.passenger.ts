export default class Passenger {
  private readonly id?: number;

  private readonly name: string;

  private readonly lastName: string;

  private readonly phoneNumber: string;

  private readonly identificationCard: string;

  private readonly status?: string;
  constructor(
    name: string,
    lastName: string,
    phoneNumber: string,
    identificationCard: string,
    id?: number,
    status?: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.identificationCard = identificationCard;
    this.status = status;
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
  get getIdentificationCard(): string {
    return this.identificationCard;
  }
  get getId(): number {
    return this.id;
  }
}
