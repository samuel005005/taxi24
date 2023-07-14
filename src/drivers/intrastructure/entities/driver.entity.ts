import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class DriverEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  driverLicense: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: true })
  available: boolean;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'A' })
  status: string;
}
