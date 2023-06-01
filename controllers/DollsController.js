import DollModel from "../models/Doll.js";
import CommentModel from "../models/Comment.js";

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

export const getOne = async (req, res) => {
  try {
    const dollId = req.params.id;

    const doll = await DollModel.findOneAndUpdate(
      {
        _id: dollId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(doll);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't get doll!",
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
      comments: req.body.comments,
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

export const getComments = async (req, res) => {
  try {
    const doll = await DollModel.findById(req.params.id);
    const comments = await Promise.all(
      doll.comments.map((comment) => {
        return CommentModel.findById(comment);
      })
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Can't get comments!",
    });
  }
};
