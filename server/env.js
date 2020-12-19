require("dotenv").config();

exports.SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || "5000";
