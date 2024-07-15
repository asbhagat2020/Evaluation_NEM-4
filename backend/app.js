// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./src/utils/logger");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const sequelize = require("./src/configs/mysql.db");
const connectDB = require("./src/configs/mongo.db");
const promotionalEmailJob = require("./src/utils/cron");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

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

promotionalEmailJob();

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

module.exports = app;
