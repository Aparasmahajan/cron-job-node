"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loggerController_1 = require("../controllers/loggerController");
const router = (0, express_1.Router)();
router.post('/logs', loggerController_1.logData);
router.get('/get-logs', loggerController_1.searchLogs);
exports.default = router;
