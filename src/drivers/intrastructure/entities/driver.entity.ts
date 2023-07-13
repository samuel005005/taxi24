import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class DriverEntity extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true, unique:true })
    driverLicense: string

    @Prop({ required: true, default: true })
    available: boolean;

    @Prop({ required: true, default: 'A' })
    status: string;

}

export const DriverSchema = SchemaFactory.createForClass(DriverEntity);
