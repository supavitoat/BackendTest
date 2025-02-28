const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        port: process.env.DATABASE_PORT || 3306,
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log("✅ MySQL Connected Successfully"))
    .catch(err => console.error("❌ MySQL Connection Error:", err));

module.exports = sequelize;
