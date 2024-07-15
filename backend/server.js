const app = require("./app");
const dotenv = require("dotenv");
const promotionalEmailJob = require("./src/utils/cron");


dotenv.config();
const port = process.env.PORT || 3001;
const io = require("./src/utils/socket")(Server);

app.get("/api", (req, res) => {
    res.send("This is the home route");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

promotionalEmailJob();