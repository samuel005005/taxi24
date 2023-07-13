import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DriverEntity } from './driver.entity';

@Schema()
export class DriverLocationEntity extends mongoose.Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'DriverEntity' })
  driver: mongoose.Types.ObjectId;

  @Prop({ required: true })
  latitud: string;

  @Prop({ required: true })
  longitud: string;

  @Prop({ required: true, default: 'A' })
  status: string;

  @Prop({ required: true, default: Date.now })
  dateAt: Date;
}

export const DriverLocationSchema =
  SchemaFactory.createForClass(DriverLocationEntity);
