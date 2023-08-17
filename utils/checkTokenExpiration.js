import Token from "../models/Token.js";

const checkTokenExpiration = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const tokenData = await Token.findOne({ token });
      if (tokenData && tokenData.expirationDate <= new Date()) {
        // Token has expired, remove it from the database
        await Token.findOneAndDelete({ token });
      }
    } catch (error) {
      // Handle error if necessary
      console.error(error);
    }
  }
  next();
};

export default checkTokenExpiration;
