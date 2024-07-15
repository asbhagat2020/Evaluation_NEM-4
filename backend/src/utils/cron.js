const cron = require("node-cron");
const sendEmail = require("./email");

const promotionalEmailJob = () => {
    cron.schedule('0 0 * * 0', () => {
        sendEmail('customer@example.com', 'Weekly Promotion', 'Check out our weekly promotions!');
    });
}

module.exports = promotionalEmailJob;
