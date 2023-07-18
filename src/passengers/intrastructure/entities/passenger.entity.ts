import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class PassengerEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  identificationCard: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'A' })
  status: string;
}
