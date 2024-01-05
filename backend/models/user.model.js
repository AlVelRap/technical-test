const conn = require("../db_connection");

// constructor
const User = function (user) {
  this.id_user = user.id_user;
  this.username = user.username;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.salt = user.salt;
};

User.create = (newUser, result) => {
  conn.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("user created: ", { id_user: res.insertId, ...newUser });
    result(null, { id_user: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  conn.query(`SELECT * FROM user WHERE id_user = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user found: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (email, result) => {
  conn.query(`SELECT * FROM user WHERE email = ?`, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user found: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = User;