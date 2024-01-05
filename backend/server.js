require("dotenv").config(); // environement variables
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const user = require("./controllers/user.controller");

// Variables
const PORT = process.env.EXPRESS_PORT || 3000;
const HOST = process.env.EXPRESS_HOST || "localhost";

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Static route for node_modules
app.use("/scripts", express.static(__dirname + "/node_modules/"));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Our routes
require("./routes/user.route")(app);
require("./routes/fatigue.route")(app);
require("./routes/player.route")(app);

// This create an Admin user
const adminUser = {
  body: {
    username: "admin",
    lastname: "admin",
    email: "admin@rv.com",
    password: "prueba",
  },
};
// We have to mock response
const fakeresponse = {};
fakeresponse.send = (value) => {
  console.log(value);
};
fakeresponse.status = (() => fakeresponse);
user.register(adminUser, fakeresponse);

app.listen(PORT, () => {
  if (process.env.DB_HOST == "localhost")
    console.log(`App listening on http://${HOST}:${PORT}`);
  else
    console.log(
      `App listening on http://${HOST}:${process.env.NODE_LOCAL_PORT}`
    );
});
