import { Column, DataType, Table } from "sequelize-typescript";
import LocationModel from "src/shared/domain/models/lotation.model";

@Table
export default class TripEntity {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    idDriver: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    idPassager: number;

    @Column({ type: DataType.JSON, allowNull: false, defaultValue: {} })
    source: LocationModel;

    @Column({ type: DataType.JSON, allowNull: false, defaultValue: {} })
    destination: LocationModel;

    @Column({ type: DataType.NUMBER, allowNull: false, defaultValue:"PEN" })
     status?: string;

}
