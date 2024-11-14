import { LoggerDataModel } from '../models/loggerDataModel';
import { CampaignStatusEnum } from './campaignService';
import { Op } from 'sequelize';
import { createApiLogger } from '../utils/logger';

const logger = createApiLogger("LoggerService");

enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
  }
  
  enum SortBy {
    API_URL = 'apiUrl',
    API_MSG = 'apiMsg',
    API_STATUS = 'apiStatus',
    CAMPAIGN_OLD_STATUS = 'campaignOldStatus',
    CAMPAIGN_NEW_STATUS = 'campaignNewStatus',
    CAMPAIGN_NAME = 'campaignName',
    APPLICATION_NAME = 'applicationName',
    CAMPAIGN_START_DATE = 'campaignStartDate',
    CAMPAIGN_END_DATE = 'campaignEndDate',
  }

interface LogData {
    apiUrl: string;
    apiMsg: string;
    apiStatus: string;
    campaignOldStatus?: CampaignStatusEnum;
    campaignNewStatus?: CampaignStatusEnum;
    campaignName: string;
    applicationName: string;
    campaignStartDate: Date;
    campaignEndDate: Date;
  }
  
  interface SearchParams {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: keyof typeof SortBy;
    sortOrder?: keyof typeof SortOrder;
  }

export class LoggerService {
  async logData(data: LogData): Promise<void> {
    try {
      await LoggerDataModel.create({
        apiUrl: data.apiUrl,
        apiMsg: data.apiMsg,
        apiStatus: data.apiStatus,
        campaignOldStatus: data.campaignOldStatus || null,
        campaignNewStatus: data.campaignNewStatus || null,
        campaignName: data.campaignName,
        applicationName: data.applicationName,
        campaignStartDate: data.campaignStartDate,
        campaignEndDate: data.campaignEndDate,
      });

      logger.info("Data logged successfully", {
        apiUrl: data.apiUrl,
        apiStatus: data.apiStatus,
        campaignName: data.campaignName,
        applicationName: data.applicationName,
      });
    } catch (error) {
      logger.error("Error logging data", {
        error: error,
        data,
      });
      console.error('Error logging data:', error);
    }
  }

  

  async searchLogs(params: SearchParams): Promise<{ rows: LoggerDataModel[]; count: number }> {
    const {
      search,
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt', // default to createdAt if no valid sortBy is provided
      sortOrder = SortOrder.DESC // default to DESC if no valid sortOrder is provided
    } = params;

    // Validate sortOrder and sortBy with enums
    const validSortOrder = Object.values(SortOrder).includes(sortOrder as SortOrder) ? sortOrder : SortOrder.DESC;
    const validSortBy = Object.values(SortBy).includes(sortBy as SortBy) ? sortBy : 'createdAt';

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Global search across all relevant fields
    const whereClause = search ? {
      [Op.or]: [
        { apiUrl: { [Op.like]: `%${search}%` } },
        { apiMsg: { [Op.like]: `%${search}%` } },
        { apiStatus: { [Op.like]: `%${search}%` } },
        { campaignOldStatus: { [Op.like]: `%${search}%` } },
        { campaignNewStatus: { [Op.like]: `%${search}%` } },
        { campaignName: { [Op.like]: `%${search}%` } },
        { applicationName: { [Op.like]: `%${search}%` } },
        { campaignStartDate: { [Op.like]: `%${search}%` } },
        { campaignEndDate: { [Op.like]: `%${search}%` } }
      ]
    } : {};

    console.log("Filters applied:", whereClause);
    console.log("Pagination - offset:", offset, "limit:", limit);

    try {
      const results = await LoggerDataModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [[validSortBy, validSortOrder]],
      });

      logger.info("Search logs executed successfully", {
        filters: params,
        count: results.count,
      });

      return {
        rows: results.rows,
        count: results.count,
      };
    } catch (error) {
      logger.error("Error executing search query", {
        error: error,
        params,
      });
      console.error('Error executing search query:', error);
      return { rows: [], count: 0 };
    }
  }
}
