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
exports.LoggerService = void 0;
const loggerDataModel_1 = require("../models/loggerDataModel");
const sequelize_1 = require("sequelize");
const logger_1 = require("../utils/logger");
const logger = (0, logger_1.createApiLogger)("LoggerService");
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
var SortBy;
(function (SortBy) {
    SortBy["API_URL"] = "apiUrl";
    SortBy["API_MSG"] = "apiMsg";
    SortBy["API_STATUS"] = "apiStatus";
    SortBy["CAMPAIGN_OLD_STATUS"] = "campaignOldStatus";
    SortBy["CAMPAIGN_NEW_STATUS"] = "campaignNewStatus";
    SortBy["CAMPAIGN_NAME"] = "campaignName";
    SortBy["APPLICATION_NAME"] = "applicationName";
    SortBy["CAMPAIGN_START_DATE"] = "campaignStartDate";
    SortBy["CAMPAIGN_END_DATE"] = "campaignEndDate";
})(SortBy || (SortBy = {}));
class LoggerService {
    logData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield loggerDataModel_1.LoggerDataModel.create({
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
            }
            catch (error) {
                logger.error("Error logging data", {
                    error: error,
                    data,
                });
                console.error('Error logging data:', error);
            }
        });
    }
    searchLogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, page = 1, pageSize = 10, sortBy = 'createdAt', // default to createdAt if no valid sortBy is provided
            sortOrder = SortOrder.DESC // default to DESC if no valid sortOrder is provided
             } = params;
            // Validate sortOrder and sortBy with enums
            const validSortOrder = Object.values(SortOrder).includes(sortOrder) ? sortOrder : SortOrder.DESC;
            const validSortBy = Object.values(SortBy).includes(sortBy) ? sortBy : 'createdAt';
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            // Global search across all relevant fields
            const whereClause = search ? {
                [sequelize_1.Op.or]: [
                    { apiUrl: { [sequelize_1.Op.like]: `%${search}%` } },
                    { apiMsg: { [sequelize_1.Op.like]: `%${search}%` } },
                    { apiStatus: { [sequelize_1.Op.like]: `%${search}%` } },
                    { campaignOldStatus: { [sequelize_1.Op.like]: `%${search}%` } },
                    { campaignNewStatus: { [sequelize_1.Op.like]: `%${search}%` } },
                    { campaignName: { [sequelize_1.Op.like]: `%${search}%` } },
                    { applicationName: { [sequelize_1.Op.like]: `%${search}%` } },
                    { campaignStartDate: { [sequelize_1.Op.like]: `%${search}%` } },
                    { campaignEndDate: { [sequelize_1.Op.like]: `%${search}%` } }
                ]
            } : {};
            console.log("Filters applied:", whereClause);
            console.log("Pagination - offset:", offset, "limit:", limit);
            try {
                const results = yield loggerDataModel_1.LoggerDataModel.findAndCountAll({
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
            }
            catch (error) {
                logger.error("Error executing search query", {
                    error: error,
                    params,
                });
                console.error('Error executing search query:', error);
                return { rows: [], count: 0 };
            }
        });
    }
}
exports.LoggerService = LoggerService;
