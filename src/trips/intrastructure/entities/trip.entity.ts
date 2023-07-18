import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DriverEntity } from 'src/drivers/intrastructure/entities/driver.entity';
import { PassengerEntity } from 'src/passengers/intrastructure/entities/passenger.entity';
import LocationModel from 'src/shared/domain/models/lotation.model';

@Table
export class TripEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => DriverEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idDriver: number;

  @ForeignKey(() => PassengerEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idPassager: number;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: {} })
  source: LocationModel;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: {} })
  destination: LocationModel;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'PEN' })
  status: string;
}
