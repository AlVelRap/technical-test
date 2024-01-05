module.exports = (app) => {
  const { isAuthenticated } = require("../auth");
  const { VERSION, REST, API } = require("../constants");
  const fatigue = require("../controllers/fatigue.controller");
  var router = require("express").Router();

  router.post("/",isAuthenticated, fatigue.create);
  router.get("/player/:id_player", fatigue.findByPlayer);

  app.use(`/${API}/${REST}/${VERSION}/fatigue`, router);
};
