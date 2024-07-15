const app = require("./app");
const dotenv = require("dotenv");
const promotionalEmailJob = require("./src/utils/cron");
const http = require("http");

dotenv.config();

// const port = process.env.PORT 
const server = http.createServer(app);

const io = require("./src/utils/socket");

app.get("/api", (req, res) => {
    res.send("This is the home route");
});

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
promotionalEmailJob();



