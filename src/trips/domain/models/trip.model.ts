import LocationModel from 'src/shared/domain/models/lotation.model';

export default class Trip {
  private readonly id?: number;

  private readonly idDriver?: number;

  private readonly idPassager: number;

  private readonly dateTrip?: Date;

  private readonly source: LocationModel;

  private readonly destination: LocationModel;

  private readonly status?: string;

  constructor(
    idPassager: number,
    source: LocationModel,
    destination: LocationModel,
    idDriver?: number,
    dateTrip?: Date,
    status?: string,
    id?: number,
  ) {
    this.id = id;
    this.idDriver = idDriver;
    this.idPassager = idPassager;
    this.dateTrip = dateTrip;
    this.source = source;
    this.destination = destination;
    this.status = status;
  }

  get getDriverId(): number {
    return this.idDriver;
  }

  get getSource(): LocationModel {
    return this.source;
  }

  get getDestination(): LocationModel {
    return this.destination;
  }
  get getPassaggerId(): number {
    return this.idDriver;
  }
}
