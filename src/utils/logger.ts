import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const createApiLogger = (a: string): winston.Logger => {

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.label({ label: `inside: ${a}` }),
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new DailyRotateFile({
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
