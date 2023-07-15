import LocationModel from 'src/shared/domain/models/lotation.model';

export default class Trip {
  private readonly id?: number;

  private readonly idDriver: number;

  private readonly idPassager: number;

  private readonly dateTrip: Date;

  private readonly source: LocationModel;

  private readonly destination: LocationModel;

  private readonly status?: string;

  constructor(
    idDriver: number,
    idPassager: number,
    dateTrip: Date,
    source: LocationModel,
    destination: LocationModel,
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
}
