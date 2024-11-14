import app from "./app";
// import dotenv from "dotenv";

// dotenv.config();
const PORT = process.env.PORT;
console.log("Port: ",PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}) 