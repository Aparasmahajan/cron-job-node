import axios from 'axios';
import { LoggerService } from './loggerService';
import { createApiLogger } from '../utils/logger';

export enum CampaignStatusEnum {
  PAUSE = "pause",
  RUNNING = "running",
  OVER = "over",
  SCHEDULED = "scheduled",
  DELETED = "deleted",
  PENDING = "pending",
}

export interface Campaign {
  id: number;
  campaignName: string;
  startDateTime: string;
  endDateTime: string;
  currentStatus: CampaignStatusEnum;
}

const logger = createApiLogger("CampaignService");

export class CampaignService {
  private loggerService = new LoggerService();

  async fetchCampaignData(applicationUrl: string, applicationName: string): Promise<Campaign[]> {
    const apiUrl = `${applicationUrl}/fetch-all-campaign`;
    console.log("inside fetch campaign Data")
    try {
      const response = await axios.get(apiUrl);
      const apiMessage = response.data.message || 'No message provided';
      const apiStatus = response.data.status || 'UNKNOWN';

      const campaigns = response.data.data.filter((campaign: Campaign) => 
        campaign.currentStatus !== CampaignStatusEnum.OVER &&
        campaign.currentStatus !== CampaignStatusEnum.DELETED
      );

      for (const campaign of campaigns) {
        await this.loggerService.logData({
          apiUrl,
          apiMsg: apiMessage,
          apiStatus: apiStatus,
          campaignName: campaign.campaignName, 
          applicationName,
          campaignStartDate: new Date(campaign.startDateTime),
          campaignEndDate: new Date(campaign.endDateTime),
        });
      }

      logger.info(`Fetched ${campaigns.length} campaigns from ${applicationUrl}`);
      return campaigns;
    } catch (error) {
      logger.error(`Error fetching campaigns from ${apiUrl}: ${error}`);
      await this.loggerService.logData({
        apiUrl,
        apiMsg: JSON.stringify(error),
        apiStatus: 'ERROR',
        campaignName: 'N/A',
        applicationName,
        campaignStartDate: new Date(),
        campaignEndDate: new Date(),
      });

      return [];
    }
  }

  async updateCampaignStatus(
    applicationUrl: string,
    campaignId: number,
    oldStatus: CampaignStatusEnum,
    newStatus: CampaignStatusEnum,
    campaignName: string,
    applicationName: string,
    campaignStartDate: Date,
    campaignEndDate: Date
  ): Promise<void> {
    const apiUrl = `${applicationUrl}/update-campaign-status/${campaignId}`;

    try {
      const response = await axios.post(apiUrl, { status: newStatus });
      const apiMessage = response.data.message || 'Status updated successfully';

      await this.loggerService.logData({
        apiUrl,
        apiMsg: apiMessage,
        apiStatus: 'SUCCESS',
        campaignOldStatus: oldStatus,
        campaignNewStatus: newStatus,
        campaignName,
        applicationName,
        campaignStartDate,
        campaignEndDate,
      });

      logger.info(`Updated status of campaign ${campaignName} from ${oldStatus} to ${newStatus}`);
    } catch (error) {
      logger.error(`Error updating campaign status for ${campaignId}: ${error}`);
      await this.loggerService.logData({
        apiUrl,
        apiMsg: JSON.stringify(error),
        apiStatus: 'ERROR',
        campaignOldStatus: oldStatus,
        campaignNewStatus: newStatus,
        campaignName,
        applicationName,
        campaignStartDate,
        campaignEndDate,
      });
    }
  }

  updateCampaignStatuses(campaigns: Campaign[], applicationUrl: string, applicationName: string): Campaign[] {
    const currentTime = new Date();

    return campaigns.map((campaign) => {
      const start = new Date(campaign.startDateTime);
      const end = new Date(campaign.endDateTime);
      const oldStatus = campaign.currentStatus;

      if (campaign.currentStatus === CampaignStatusEnum.SCHEDULED && currentTime >= start && currentTime < end) {
        campaign.currentStatus = CampaignStatusEnum.RUNNING;
      } else if (
        (campaign.currentStatus === CampaignStatusEnum.RUNNING ||
         campaign.currentStatus === CampaignStatusEnum.PAUSE ||
         campaign.currentStatus === CampaignStatusEnum.SCHEDULED) && currentTime >= end
      ) {
        campaign.currentStatus = CampaignStatusEnum.OVER;
      }

      if (oldStatus !== campaign.currentStatus) {
        this.loggerService.logData({
          apiUrl: `${applicationUrl}/fetch-all-campaign`,
          apiMsg: `Campaign status changed from ${oldStatus} to ${campaign.currentStatus}`,
          apiStatus: 'STATUS_CHANGE',
          campaignOldStatus: oldStatus,
          campaignNewStatus: campaign.currentStatus,
          campaignName: campaign.campaignName,
          applicationName,
          campaignStartDate: start,
          campaignEndDate: end,
        });

        logger.info(`Status of campaign ${campaign.campaignName} changed from ${oldStatus} to ${campaign.currentStatus}`);
      }

      return campaign;
    });
  }
}
