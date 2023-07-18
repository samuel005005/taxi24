export default class Invoice {
  private readonly id?: number;

  private readonly idTravel?: number;

  private readonly idPassager: number;

  private readonly amount: number;

  private readonly status?: string;

  private readonly dateInvoice?: Date;

  constructor(
    idTravel: number,
    idPassager: number,
    amount: number,
    status?: string,
    dateInvoice?: Date,
    id?: number,
  ) {
    this.id = id;
    this.idTravel = idTravel;
    this.idPassager = idPassager;
    this.amount = amount;
    this.status = status;
  }

  get getIdTravel(): number {
    return this.idTravel;
  }

  get getIdPassenger(): number {
    return this.idPassager;
  }

  get getAmount(): number {
    return this.amount;
  }
  get getStatus(): string {
    return this.status;
  }
}
