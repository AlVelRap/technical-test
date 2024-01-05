module.exports = (app) => {
  const { isAuthenticated } = require("../auth");
  const { VERSION, REST, API } = require("../constants");
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  router.post("/register", user.register);
  router.post("/login", user.login);

  app.use(`/${API}/${REST}/${VERSION}/user`, router);
};
