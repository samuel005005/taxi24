export default class Invoice {
  private readonly id?: number;

  private readonly idTrip?: number;

  private readonly idPassenger: number;

  private readonly amount: number;

  private readonly status?: string;

  private readonly dateInvoice?: Date;

  constructor(
    idTrip: number,
    idPassenger: number,
    amount: number,
    status?: string,
    dateInvoice?: Date,
    id?: number,
  ) {
    this.id = id;
    this.idTrip = idTrip;
    this.idPassenger = idPassenger;
    this.amount = amount;
    this.status = status;
  }

  get getIdTravel(): number {
    return this.idTrip;
  }

  get getIdPassenger(): number {
    return this.idPassenger;
  }

  get getAmount(): number {
    return this.amount;
  }
  get getStatus(): string {
    return this.status;
  }
}
