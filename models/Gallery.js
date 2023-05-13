import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", GallerySchema);
