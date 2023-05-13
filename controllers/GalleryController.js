import GalleryModel from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await GalleryModel.find().exec();
    res.json(gallery);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can`t get dolls!",
    });
  }
};

export const addPhoto = async (req, res) => {
  try {
    const doc = new GalleryModel({
      imageUrl: req.body.imageUrl,
    });

    const photo = await doc.save();
    res.json(photo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't add photo!",
    });
  }
};
