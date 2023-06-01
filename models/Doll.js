import mongoose from "mongoose";

const DollSchema = new mongoose.Schema(
  {
    dollName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      //default: [],
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doll", DollSchema);
