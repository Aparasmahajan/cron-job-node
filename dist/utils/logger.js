"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const createApiLogger = (a) => {
    const logger = winston_1.default.createLogger({
        level: "info",
        format: winston_1.default.format.combine(winston_1.default.format.label({ label: `inside: ${a}` }), winston_1.default.format.timestamp(), winston_1.default.format.json()),
        transports: [
            new winston_daily_rotate_file_1.default({
                filename: process.env.LOG_DIR,
                datePattern: "YYYY-MM-DD",
                zippedArchive: false,
                maxSize: 2 * 1024 * 1024, // Maximum size per file: 2KB
                maxFiles: 10, // Keep logs for the last 10 days
                extension: ".log", // Ensures the file extension remains .log
            }),
        ],
    });
    return logger;
};
exports.createApiLogger = createApiLogger;
