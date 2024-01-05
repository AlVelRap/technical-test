const Player = require("../models/player.model.js");

exports.findAll = (req, res) => {
  Player.getAll((err, data) => {
    if (err) {
      console.log(err);
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Players not found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while receiving Players",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Player.findById(req.params.id_player, (err, data) => {
    if (err) {
      console.log(err);
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Player with id ${req.params.id_player} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error when receiving the User with id " + req.params.id_player,
        });
      }
    } else {
      res.send(data);
    }
  });
};
