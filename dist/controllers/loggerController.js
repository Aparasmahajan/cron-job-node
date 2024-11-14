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
exports.searchLogs = exports.logData = void 0;
const loggerService_1 = require("../services/loggerService");
const loggerService = new loggerService_1.LoggerService();
// Controller to log new data
const logData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loggerService.logData(req.body);
        res.status(201).json({ message: 'Data logged successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging data', error: error });
    }
});
exports.logData = logData;
// Controller to search logs
const searchLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        console.log("Search parameters received:", params);
        const logs = yield loggerService.searchLogs(params);
        res.json(logs);
    }
    catch (error) {
        console.error("Error searching logs:", error);
        res.status(500).json({ message: 'Error searching logs', error: error });
    }
});
exports.searchLogs = searchLogs;
