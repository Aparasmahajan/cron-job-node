"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignService = exports.CampaignStatusEnum = void 0;
const axios_1 = __importDefault(require("axios"));
const loggerService_1 = require("./loggerService");
const logger_1 = require("../utils/logger");
var CampaignStatusEnum;
(function (CampaignStatusEnum) {
    CampaignStatusEnum["PAUSE"] = "pause";
    CampaignStatusEnum["RUNNING"] = "running";
    CampaignStatusEnum["OVER"] = "over";
    CampaignStatusEnum["SCHEDULED"] = "scheduled";
    CampaignStatusEnum["DELETED"] = "deleted";
    CampaignStatusEnum["PENDING"] = "pending";
})(CampaignStatusEnum || (exports.CampaignStatusEnum = CampaignStatusEnum = {}));
const logger = (0, logger_1.createApiLogger)("CampaignService");
class CampaignService {
    constructor() {
        this.loggerService = new loggerService_1.LoggerService();
    }
    fetchCampaignData(applicationUrl, applicationName) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `${applicationUrl}/fetch-all-campaign`;
            console.log("inside fetch campaign Data");
            try {
                const response = yield axios_1.default.get(apiUrl);
                const apiMessage = response.data.message || 'No message provided';
                const apiStatus = response.data.status || 'UNKNOWN';
                const campaigns = response.data.data.filter((campaign) => campaign.currentStatus !== CampaignStatusEnum.OVER &&
                    campaign.currentStatus !== CampaignStatusEnum.DELETED);
                for (const campaign of campaigns) {
                    yield this.loggerService.logData({
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
            }
            catch (error) {
                logger.error(`Error fetching campaigns from ${apiUrl}: ${error}`);
                yield this.loggerService.logData({
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
        });
    }
    updateCampaignStatus(applicationUrl, campaignId, oldStatus, newStatus, campaignName, applicationName, campaignStartDate, campaignEndDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `${applicationUrl}/update-campaign-status/${campaignId}`;
            try {
                const response = yield axios_1.default.post(apiUrl, { status: newStatus });
                const apiMessage = response.data.message || 'Status updated successfully';
                yield this.loggerService.logData({
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
            }
            catch (error) {
                logger.error(`Error updating campaign status for ${campaignId}: ${error}`);
                yield this.loggerService.logData({
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
        });
    }
    updateCampaignStatuses(campaigns, applicationUrl, applicationName) {
        const currentTime = new Date();
        return campaigns.map((campaign) => {
            const start = new Date(campaign.startDateTime);
            const end = new Date(campaign.endDateTime);
            const oldStatus = campaign.currentStatus;
            if (campaign.currentStatus === CampaignStatusEnum.SCHEDULED && currentTime >= start && currentTime < end) {
                campaign.currentStatus = CampaignStatusEnum.RUNNING;
            }
            else if ((campaign.currentStatus === CampaignStatusEnum.RUNNING ||
                campaign.currentStatus === CampaignStatusEnum.PAUSE ||
                campaign.currentStatus === CampaignStatusEnum.SCHEDULED) && currentTime >= end) {
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
exports.CampaignService = CampaignService;
