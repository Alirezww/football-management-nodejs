const Application = require("./app/server");
require("dotenv").config({ path : "./config/.env" });
new Application(9000, process.env.MONGO_URL);