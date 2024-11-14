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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationDataService = void 0;
const applicationDataModel_1 = require("../models/applicationDataModel");
const logger_1 = require("../utils/logger");
const logger = (0, logger_1.createApiLogger)("ApplicationDataService");
class ApplicationDataService {
    // Fetch all applications
    getAllApplications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield applicationDataModel_1.ApplicationDataModel.findAll();
                logger.info("Fetched all applications", { count: applications.length });
                return applications;
            }
            catch (error) {
                logger.error("Error fetching all applications:", error);
                throw error; // Re-throw error after logging
            }
        });
    }
    // Fetch application by ID
    getApplicationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const application = yield applicationDataModel_1.ApplicationDataModel.findByPk(id);
                if (application) {
                    logger.info(`Fetched application with ID: ${id}`);
                }
                else {
                    logger.warn(`Application with ID: ${id} not found`);
                }
                return application;
            }
            catch (error) {
                logger.error(`Error fetching application by ID (${id}):`, error);
                throw error;
            }
        });
    }
    // Create a new application
    createApplication(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newApplication = yield applicationDataModel_1.ApplicationDataModel.create(data);
                logger.info("Created new application", { applicationName: newApplication.applicationName });
                return newApplication;
            }
            catch (error) {
                logger.error("Error creating application:", error);
                throw error;
            }
        });
    }
    // Update an existing application
    updateApplication(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const application = yield applicationDataModel_1.ApplicationDataModel.findByPk(id);
                if (application) {
                    const updatedApplication = yield application.update(data);
                    logger.info(`Updated application with ID: ${id}`, { applicationName: updatedApplication.applicationName });
                    return updatedApplication;
                }
                else {
                    logger.warn(`Application with ID: ${id} not found for update`);
                    return null;
                }
            }
            catch (error) {
                logger.error(`Error updating application with ID (${id}):`, error);
                throw error;
            }
        });
    }
    // Delete an application
    deleteApplication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const application = yield applicationDataModel_1.ApplicationDataModel.findByPk(id);
                if (application) {
                    yield application.destroy();
                    logger.info(`Deleted application with ID: ${id}`);
                    return true;
                }
                else {
                    logger.warn(`Application with ID: ${id} not found for deletion`);
                    return false;
                }
            }
            catch (error) {
                logger.error(`Error deleting application with ID (${id}):`, error);
                throw error;
            }
        });
    }
}
exports.ApplicationDataService = ApplicationDataService;
