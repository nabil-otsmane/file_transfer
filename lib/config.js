var dotenv = require("dotenv");

dotenv.config();

module.exports = {
    default_port: process.env.PORT
}