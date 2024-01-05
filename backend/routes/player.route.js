module.exports = (app) => {
  const { isAuthenticated } = require("../auth");
  const { VERSION, REST, API } = require("../constants");
  const player = require("../controllers/player.controller");
  var router = require("express").Router();

  router.get("/",isAuthenticated, player.findAll);
  router.get("/:id_player",isAuthenticated, player.findOne);

  app.use(`/${API}/${REST}/${VERSION}/player`, router);
};
