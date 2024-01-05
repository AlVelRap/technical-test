const User = require("../models/user.model.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  DIGEST_PASSWORD,
  JWT_LIFE,
  JWT_ALGORITHM,
} = require("../constants");

// Constants for encrypt password
const iterations = 10000;
const keylen = 64;

// Function for token
const signToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_LIFE,
  });
};

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }

  User.findByEmail(req.body.email, (err, data) => {
    if (data) {
      return res.status(400).send({
        message: "User already exists.",
      });
    }
    // Create salt
    crypto.randomBytes(16, (err, saltBytes) => {
      const newSalt = saltBytes.toString("base64");
      // Encrypt password
      crypto.pbkdf2(
        req.body.password,
        newSalt,
        iterations,
        keylen,
        DIGEST_PASSWORD,
        (err, key) => {
          const encryptedPassword = key.toString("base64");
          // Create a new User
          const user = new User({
            username: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            salt: newSalt,
          });
          User.create(user, (err, data) => {
            if (err)
              return res.status(500).send({
                message:
                  err.message || "An error occurred while creating the user.",
              });
            else {
              res.send({
                nombre: data.username,
                apellidos: data.lastname,
                email: data.email,
              });
            }
          });
        }
      );
    });
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: `The request cannot be empty!`,
    });
  }

  User.findByEmail(req.body.email, (err, data) => {
    if (!data) {
      return res.status(404).send({
        message: `Incorrect username or password`,
      });
    }
    crypto.pbkdf2(
      req.body.password,
      data.salt,
      iterations,
      keylen,
      DIGEST_PASSWORD,
      (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (data.password === encryptedPassword) {
          const token = signToken(data.id_user);
          return res.send({ token });
        }
        return res.status(404).send({
          message: `Incorrect username or password`,
        });
      }
    );
  });
};
