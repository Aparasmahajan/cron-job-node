import { Sequelize } from "sequelize-typescript";
// const { Sequelize } = require('sequelize');
import dotenv from "dotenv";
import { DataSource } from "typeorm"
import testModel from "./models/applicationDataModel"

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: process.env.DB_USE_SSL === "true", // Enable SSL based on the environment variable
    },
    models: [__dirname + '/models'],
    logging: false, // Enable SQL logging for debugging
    pool: {
      max: 1,
      min: 0,
    },
});



// const MysqlDataSource = new DataSource({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [
//         testModel
//     ],
// })


// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

console.log("process name: ",process.env.DB_NAME);
console.log("dir name: ",__dirname);
console.log("password: ",process.env.DB_PASSWORD);

const connectDB=async()=>{
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}



// MysqlDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })


// DB connection test
(async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
})();

export default sequelize;
