const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, 'haosecret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.userId;
    req.userLogin = decoded.login;
    next();
  });
};

module.exports = verifyToken;