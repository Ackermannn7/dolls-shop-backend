import mongoose from "mongoose";
import Doll from "./Doll.js"; // Import the Doll model

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        doll: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doll", // Reference to the Doll model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
