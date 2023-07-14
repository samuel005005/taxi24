import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class DriverEntity extends Model<DriverEntity> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  driverLicense: string;

  @Column({ type: DataType.STRING, allowNull: false })
  available: boolean;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'A' })
  status: string;
}
