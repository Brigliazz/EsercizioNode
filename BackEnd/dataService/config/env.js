require("dotenv").config();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI non definita nel file .env");
  process.exit(1);
}

module.exports = {
  PORT: parseInt(process.env.PORT || process.env.DATA_SERVICE_PORT || "3003", 10),
  SERVICE_NAME: process.env.SERVICE_NAME || "data-service",
  MONGODB_URI: process.env.MONGODB_URI
};