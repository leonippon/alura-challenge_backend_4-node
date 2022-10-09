const jwt = require("jsonwebtoken");
database = require("../db/models/index.js");

const verifyToken = (req, res, next) => {

  if (req.headers.token) {
    jwt.verify(req.headers.token,
    process.env.API_SECRET,
    async function (err, decode) {
      if (err) req.user = undefined;
      try {
        const user = await database.User.findOne({ where: { id: decode.id }});
        if (!!user) {
          req.user = user;
          next();
        } else {
          return res.status(500).send(err.message);
      }} catch (err) {
        return res.status(500).send(err.message);
      }
    });
  } else {
    req.user = undefined;
    res.status(403).send({ "message": "Access not authorized."})
  }
}

module.exports = verifyToken;