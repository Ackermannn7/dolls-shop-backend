import Token from "../models/Token.js";

const checkTokenExpiration = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      setTimeout(async () => {
        await Token.findOneAndDelete({ token });
      }, 3600000);
    } catch (error) {
      console.error(error);
    }
  }

  next();
};

export default checkTokenExpiration;
