const {createLogger, format, transports} = require("winston");
const {combine, timeStamp, printf} = format;

const customFormat = printf(({level, message, timeStamp})=>{
    return `${timeStamp}, [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(timeStamp(), customFormat),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'combined.log'}),
    ]
})

module.exports = logger;