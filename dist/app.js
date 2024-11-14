"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const applicationDataRoutes_1 = __importDefault(require("./routes/applicationDataRoutes"));
const loggerRoutes_1 = __importDefault(require("./routes/loggerRoutes"));
const fetchCampaignDataJob_1 = __importDefault(require("./cron/fetchCampaignDataJob"));
// Create Express app
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
console.log("Port: ", PORT);
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/v1/", applicationDataRoutes_1.default);
app.use("/v1/logs", loggerRoutes_1.default);
// Sync database
database_1.default.sync({
    alter: false
}).then(() => {
    console.log("DB & Table created");
    (0, fetchCampaignDataJob_1.default)();
});
exports.default = app;
