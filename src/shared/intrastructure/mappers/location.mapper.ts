import LocationModel from "src/shared/domain/models/lotation.model";
import { LocationDto } from "../dto/location-dto";

export default class LocationMapper {
    public static DtoToDomain(locationDto: LocationDto ): LocationModel {
        const location = new LocationModel(
            locationDto.latitude,
            locationDto.longitude
        );
        return location;
      }
    
}