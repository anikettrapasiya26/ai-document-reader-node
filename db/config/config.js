require('dotenv').config();
module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  sample_database: {
    database: process.env.DB_NAME_SAMPLE,
    username: process.env.DB_USERNAME_SAMPLE,
    password: process.env.DB_PASSWORD_SAMPLE,
    host: process.env.DB_HOST_SAMPLE,
    port: process.env.DB_PORT_SAMPLE,
    dialect: process.env.DB_DIALECT_SAMPLE,
  },
};
