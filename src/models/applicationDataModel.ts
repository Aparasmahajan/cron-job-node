import {
  Model,
  Column,
  Table,
  DataType,
  AutoIncrement
} from "sequelize-typescript";


@Table({
  tableName: "application_data",
  timestamps: true
})
export class ApplicationDataModel extends Model {
  
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement:true})
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, field: "application_name"})
  applicationName!: string;

  @Column({ type: DataType.STRING, allowNull: false, field: "application_url" })
  applicationUrl!: string;

  @Column({
    type: DataType.BOOLEAN, allowNull: false, field: "is_active" 
  })
  isActive!: boolean;
}
export default ApplicationDataModel;