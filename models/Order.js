import mongoose from "mongoose";
import Doll from "./Doll.js"; // Import the Doll model

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        doll: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doll",
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
    formData: {
      orderFullName: {
        type: String,
        required: true,
      },
      orderPhoneNumber: {
        type: String,
        required: true,
      },
      selectedRegion: {
        type: String,
        required: true,
      },
      selectedCity: {
        type: String,
        required: true,
      },
      selectedBranch: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
