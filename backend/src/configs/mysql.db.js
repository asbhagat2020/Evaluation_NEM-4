const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log, // or false if you don't want to see SQL queries
});

sequelize.authenticate()
    .then(() => {
        console.log('MySQL connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to MySQL database:', err);
    });

module.exports = sequelize;
