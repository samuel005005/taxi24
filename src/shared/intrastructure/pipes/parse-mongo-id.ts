import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    // if (!isValidObjectId(value)) {
    //   throw new BadRequestException(`${value} is not a valid MongoID`);
    // }
    return value;
  }
}
