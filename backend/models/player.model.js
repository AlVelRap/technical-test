const conn = require("../db_connection");

// constructor
const Player = function (player) {
  this.id_player = player.id_player;
  this.firstname = player.firstname;
  this.lastname = player.lastname;
  this.img = player.img;
};

Player.findById = (id, result) => {
  conn.query(`SELECT * FROM players WHERE id_player = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("player found: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Player.getAll = (result) => {
  conn.query(`SELECT * FROM players`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("players found: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Player;
