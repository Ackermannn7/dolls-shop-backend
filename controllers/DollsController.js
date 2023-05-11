import DollModel from "../models/Doll.js";

export const getAllDolls = async (req, res) => {
  try {
    const dolls = await DollModel.find().exec();
    res.json(dolls);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can`t get dolls!",
    });
  }
};

export const createDoll = async (req, res) => {
  try {
    const doc = new DollModel({
      dollName: req.body.dollName,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't create doll!",
    });
  }
};