import dotenv from "dotenv";
import express, { Application} from "express"; 
import MysqlDataSource from "./database"; 
import applicationDataRoutes from "./routes/applicationDataRoutes" ;
import loggerRoutes from "./routes/loggerRoutes" ;
import runJob from "./cron/fetchCampaignDataJob"

// Create Express app
const app:Application = express();

dotenv.config();

const PORT = process.env.PORT;
console.log("Port: ",PORT)

// Middleware
app.use(express.json());

// Routes
app.use("/v1/", applicationDataRoutes);
app.use("/v1/logs", loggerRoutes);  


// Sync database
MysqlDataSource.sync({
    alter: false
}).then (() => {
console.log("DB & Table created");
runJob();
});
export default app;