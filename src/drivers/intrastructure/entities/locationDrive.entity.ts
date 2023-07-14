import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DriverEntity } from './driver.entity';

@Table
export class DriverLocationEntity extends Model<DriverLocationEntity> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => DriverEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driver: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  latitude: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  longitude: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'A' })
  status: string;

  @BelongsTo(() => DriverEntity)
  user: DriverEntity;
}
