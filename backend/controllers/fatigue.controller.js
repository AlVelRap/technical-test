const Fatigue = require("../models/fatigue.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Request must not be empty!",
    });
  }
  const fatigue = new Fatigue({
    id_player: req.body.id_player,
    feeling: req.body.feeling,
  });

  Fatigue.create(fatigue, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error happened while create Fatigue Registry.",
      });
    else res.send(data);
  });
};

exports.findByPlayer = (req, res) => {
  Fatigue.findByIdPlayer(req.params.id_player, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Fatigue registry for player with id ${req.params.id_player}.`,
        });
      } else {
        res.status(500).send({
          message: "Error while retrieving Fatigue registry for player with Id " + req.params.id_player,
        });
      }
    } else res.send(data);
  });
};

