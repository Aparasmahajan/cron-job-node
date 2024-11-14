import { Request, Response } from 'express';
import { LoggerService } from '../services/loggerService';

const loggerService = new LoggerService();

// Controller to log new data
export const logData = async (req: Request, res: Response) => {
  try {
    await loggerService.logData(req.body);
    res.status(201).json({ message: 'Data logged successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging data', error: error });
  }
};

// Controller to search logs
export const searchLogs = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    console.log("Search parameters received:", params); 
    
    const logs = await loggerService.searchLogs(params);
    res.json(logs);
  } catch (error) {
    console.error("Error searching logs:", error);
    res.status(500).json({ message: 'Error searching logs', error: error });
  }
};
