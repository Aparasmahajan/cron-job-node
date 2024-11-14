import { ApplicationDataModel } from '../models/applicationDataModel';
import { createApiLogger } from '../utils/logger';

const logger = createApiLogger("ApplicationDataService");

export class ApplicationDataService {

  // Fetch all applications
  async getAllApplications() {
    try {
      const applications = await ApplicationDataModel.findAll();
      logger.info("Fetched all applications", { count: applications.length });
      return applications;
    } catch (error) {
      logger.error("Error fetching all applications:", error);
      throw error; // Re-throw error after logging
    }
  }

  // Fetch application by ID
  async getApplicationById(id: string) {
    try {
      const application = await ApplicationDataModel.findByPk(id);
      if (application) {
        logger.info(`Fetched application with ID: ${id}`);
      } else {
        logger.warn(`Application with ID: ${id} not found`);
      }
      return application;
    } catch (error) {
      logger.error(`Error fetching application by ID (${id}):`, error);
      throw error;
    }
  }

  // Create a new application
  async createApplication(data: Partial<ApplicationDataModel>) {
    try {
      const newApplication = await ApplicationDataModel.create(data);
      logger.info("Created new application", { applicationName: newApplication.applicationName });
      return newApplication;
    } catch (error) {
      logger.error("Error creating application:", error);
      throw error;
    }
  }

  // Update an existing application
  async updateApplication(id: string, data: Partial<ApplicationDataModel>) {
    try {
      const application = await ApplicationDataModel.findByPk(id);
      if (application) {
        const updatedApplication = await application.update(data);
        logger.info(`Updated application with ID: ${id}`, { applicationName: updatedApplication.applicationName });
        return updatedApplication;
      } else {
        logger.warn(`Application with ID: ${id} not found for update`);
        return null;
      }
    } catch (error) {
      logger.error(`Error updating application with ID (${id}):`, error);
      throw error;
    }
  }

  // Delete an application
  async deleteApplication(id: string) {
    try {
      const application = await ApplicationDataModel.findByPk(id);
      if (application) {
        await application.destroy();
        logger.info(`Deleted application with ID: ${id}`);
        return true;
      } else {
        logger.warn(`Application with ID: ${id} not found for deletion`);
        return false;
      }
    } catch (error) {
      logger.error(`Error deleting application with ID (${id}):`, error);
      throw error;
    }
  }
}
