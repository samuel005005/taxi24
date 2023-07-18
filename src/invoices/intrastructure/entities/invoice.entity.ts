import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class InvoiceEntity extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  idTravel: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  idPassenger: number;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: 0 })
  amount: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'PEN' })
  status: string;
}
