const conn = require("../db_connection");

// constructor
const Fatigue = function (fatigue) {
  this.id_fatigue = fatigue.id_fatigue;
  this.id_player = fatigue.id_player;
  this.feeling = fatigue.feeling;
  this.registry_date = fatigue.registry_date;
};

Fatigue.create = (newRegistry, result) => {
  if (newRegistry.registry_date) {
    conn.query("INSERT INTO fatigue SET ?", newRegistry, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("fatigue registred: ", {
        id_fatigue: res.insertId,
        ...newRegistry,
      });
      result(null, { id_fatigue: res.insertId, ...newRegistry });
    });
  } else {
    conn.query(
      "INSERT INTO fatigue (id_player, feeling) Value (?, ?)",
      [newRegistry.id_player, newRegistry.feeling],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("fatigue registred: ", {
          id_fatigue: res.insertId,
          ...newRegistry,
        });
        result(null, { id_fatigue: res.insertId, ...newRegistry });
      }
    );
  }
};

Fatigue.findByIdPlayer = (id, result) => {
  conn.query(
    `SELECT * FROM fatigue WHERE id_player = ? AND registry_date <= NOW() AND registry_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) `,
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("fatigue registry found: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Fatigue;
