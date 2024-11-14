import cron from 'node-cron';
import { CampaignService } from '../services/campaignService';
import { ApplicationDataModel } from '../models/applicationDataModel';
import { createApiLogger } from '../utils/logger';
const campaignService = new CampaignService();

const logger = createApiLogger("CampaignCron");
export default function runJob(){
  console.log("inside run")
  console.log(process.env.MAIN_CRON_SCHEDULE);
  console.log(cron.validate(String(process.env.MAIN_CRON_SCHEDULE)))


const mainCronSchedule = String(process.env.MAIN_CRON_SCHEDULE);
if(cron.validate(mainCronSchedule)){
  cron.schedule(mainCronSchedule, scheduleIndividualJobs);
}
else{
  console.log("Not a valid cron job value "+ process.env.MAIN_CRON_SCHEDULE)
}

}


// Function to schedule individual jobs based on each application’s `cron_job_value`
async function scheduleIndividualJobs() {
  console.log("inside individual schedule job")
  const applications = await ApplicationDataModel.findAll();
console.log("applicationData: ",applications);
  applications.forEach((app) => {
    logger.info(`Scheduling individual cron for application: ${app.applicationName} app is schedulable: ${app.isActive}`);
    console.log("checking is active true")

    if (app.isActive) {
      // Schedule each application's job based on its `cron_job_value`
      console.log("inside of is active true")
      async () => {
        // Fetch campaigns and process statuses for the individual job

        console.log("Application name:"+ app.applicationName)
        console.log("Application url:"+ app.applicationUrl)
        const campaigns = await campaignService.fetchCampaignData(app.applicationUrl, app.applicationName);
        const updatedCampaigns = campaignService.updateCampaignStatuses(campaigns, app.applicationUrl, app.applicationName);
        console.log("Campaign:"+ campaigns)

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
      }
}});
}