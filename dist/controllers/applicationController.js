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
exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getApplicationById = exports.getAllApplications = void 0;
const applicationDataService_1 = require("../services/applicationDataService");
const applicationDataService = new applicationDataService_1.ApplicationDataService();
const getAllApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield applicationDataService.getAllApplications();
    res.json(applications);
});
exports.getAllApplications = getAllApplications;
const getApplicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield applicationDataService.getApplicationById(req.params.id);
    if (application) {
        res.json(application);
    }
    else {
        res.status(404).json({ message: 'Application not found' });
    }
});
exports.getApplicationById = getApplicationById;
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield applicationDataService.createApplication(req.body);
    res.status(201).json(application);
});
exports.createApplication = createApplication;
const updateApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedApplication = yield applicationDataService.updateApplication(req.params.id, req.body);
    if (updatedApplication) {
        res.json(updatedApplication);
    }
    else {
        res.status(404).json({ message: 'Application not found' });
    }
});
exports.updateApplication = updateApplication;
const deleteApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield applicationDataService.deleteApplication(req.params.id);
    if (deleted) {
        res.status(204).end();
    }
    else {
        res.status(404).json({ message: 'Application not found' });
    }
});
exports.deleteApplication = deleteApplication;
