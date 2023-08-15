import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tokenType: {
    type: String,
    enum: ["login", "resetPassword"],
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("tokens", TokenSchema);
