const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const sequelize = require("./src/configs/mysql.db");
const connectDB = require("./src/configs/mongo.db");
const cors = require("cors");
const logger = require("./src/utils/logger");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next)=>{
    logger.info(`${req.method} ${req.url}`);
})

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

(async () => {
    try {
        await sequelize.sync();
        await connectDB();
        console.log('Databases synced successfully.');
    } catch (error) {
        console.error('Failed to sync databases:', error);
    }
})();

module.exports = app;
