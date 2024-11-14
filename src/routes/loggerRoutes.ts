import { Router } from 'express';
import { logData, searchLogs } from '../controllers/loggerController';

const router: Router = Router();

router.post('/logs', logData);    
router.get('/get-logs', searchLogs); 

export default router;
