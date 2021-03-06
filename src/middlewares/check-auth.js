const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const secretKey = process.env.NODE_APP_JSON_WEB_TOKENS_KEY;

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed, please try again later.");
    }
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    return next(
      new HttpError("Authentication failed, please try again later.", 403),
    );
  }
};

module.exports = checkAuth;
