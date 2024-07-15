const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const sequelize = require("./src/configs/mysql.db");
const connectDB = require("./src/configs/mongo.db");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const logger = require("./utils/logger");
const eventEmitter = require("./utils/eventEmitter");


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).json({ error: err.message });
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    eventEmitter.on('bookAdded', (bookId) => {
        io.emit('newBook', { bookId });
    });
});

(async () => {
    try {
        await sequelize.sync();
        console.log('MySQL connection established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to MySQL database:', error);
    }
    await connectDB();
       

})();

module.exports = { app, server };
