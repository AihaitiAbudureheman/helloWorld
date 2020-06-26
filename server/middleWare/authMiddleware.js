const jwt = require("jsonwebtoken");
const expressJwt =  require("express-jwt");

const TOKENTIME = 60 * 60 * 8; // 8 hour
const SECRET = "W3 Hav3 th3 kn0w";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id
    },
    SECRET,
    {
      expiresIn: TOKENTIME
    }
  );

  next();
};

let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
};

module.exports = {
  authenticate,
  generateAccessToken,
  respond
};