// DEPENDENCIES
const app = require("./app");

// CONFIGURATION
require("dotenv").config();
// const PORT = process.env.PORT;

// LISTEN
app.listen({ port: process.env.PORT, host: "0.0.0.0" });
