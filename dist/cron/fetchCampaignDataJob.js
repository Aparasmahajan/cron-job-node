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
exports.default = runJob;
const node_cron_1 = __importDefault(require("node-cron"));
const campaignService_1 = require("../services/campaignService");
const applicationDataModel_1 = require("../models/applicationDataModel");
const logger_1 = require("../utils/logger");
const campaignService = new campaignService_1.CampaignService();
const logger = (0, logger_1.createApiLogger)("CampaignCron");
function runJob() {
    console.log("inside run");
    console.log(process.env.MAIN_CRON_SCHEDULE);
    console.log(node_cron_1.default.validate(String(process.env.MAIN_CRON_SCHEDULE)));
    const mainCronSchedule = String(process.env.MAIN_CRON_SCHEDULE);
    if (node_cron_1.default.validate(mainCronSchedule)) {
        node_cron_1.default.schedule(mainCronSchedule, scheduleIndividualJobs);
    }
    else {
        console.log("Not a valid cron job value " + process.env.MAIN_CRON_SCHEDULE);
    }
}
// Function to schedule individual jobs based on each application’s `cron_job_value`
function scheduleIndividualJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inside individual schedule job");
        const applications = yield applicationDataModel_1.ApplicationDataModel.findAll();
        console.log("applicationData: ", applications);
        applications.forEach((app) => {
            logger.info(`Scheduling individual cron for application: ${app.applicationName} app is schedulable: ${app.isActive}`);
            if (app.isActive) {
                // Schedule each application's job based on its `cron_job_value`
                () => __awaiter(this, void 0, void 0, function* () {
                    // Fetch campaigns and process statuses for the individual job
                    const campaigns = yield campaignService.fetchCampaignData(app.applicationUrl, app.applicationName);
                    const updatedCampaigns = campaignService.updateCampaignStatuses(campaigns, app.applicationUrl, app.applicationName);
                    console.log("Application name:" + app.applicationName);
                    console.log("Application url:" + app.applicationUrl);
                    console.log("Campaign:" + campaigns);
                    // for (const campaign of updatedCampaigns) {
                    //   if (campaign.currentStatus !== CampaignStatusEnum.SCHEDULED) {
                    //     await campaignService.updateCampaignStatus(
                    //       app.applicationUrl,
                    //       campaign.id,
                    //       campaign.currentStatus,
                    //       campaign.currentStatus,
                    //       campaign.campaignName,
                    //       app.applicationName,
                    //       new Date(campaign.startDateTime),
                    //       new Date(campaign.endDateTime)
                    //     );
                    //   }
                    // }
                    logger.info(`Individual cron job for ${app.applicationName} completed.`);
                });
            }
        });
    });
}
