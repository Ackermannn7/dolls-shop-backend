import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

export default async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied! No token provided." });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY_LOGIN);

      const tokenData = await Token.findOne({
        _userId: decoded._id,
        token,
        tokenType: "login",
      });

      if (!tokenData) {
        return res
          .status(403)
          .json({ message: "Access denied! Invalid token." });
      }

      req.token = token;
      req.userId = decoded._id;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Access denied! Invalid token." });
    }
  }
};
