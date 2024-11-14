import {
    Model,
    Column,
    Table,
    DataType,
    AutoIncrement
  } from "sequelize-typescript";
  
  @Table({
    tableName: "logger_data",
    timestamps: true 
  })
  export class LoggerDataModel extends Model {
    
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "api_url" })
    apiUrl!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "api_msg" })
    apiMsg!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "api_status" })
    apiStatus!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "campaign_old_status" })
    campaignOldStatus!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "campaign_new_status" })
    campaignNewStatus!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "campaign_name" })
    campaignName!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, field: "application_name" })
    applicationName!: string;
  
    @Column({ type: DataType.DATE, allowNull: false, field: "campaign_start_date" })
    campaignStartDate!: Date;
  
    @Column({ type: DataType.DATE, allowNull: false, field: "campaign_end_date" })
    campaignEndDate!: Date;
  }
  
  export default LoggerDataModel;
  