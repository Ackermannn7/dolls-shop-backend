import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  const decoded = jwt.verify(token, "secretCode3228!-32fd");

  if (!token) {
    return res.status(403).json({ message: "Access denied!" });
  } else {
    try {
      Token.findOne({
        _userId: decoded._id,
        token,
        tokenType: "login",
      });
      req.token = token;

      req.userId = decoded._id;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Access denied!" });
    }
  }
};
