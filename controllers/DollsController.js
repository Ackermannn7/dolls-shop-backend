import DollModel from "../models/Doll.js";
import CommentModel from "../models/Comment.js";

export const getAllDolls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 3;
    const search = req.query.searchValue || "";
    let sort = req.query.sort || "viewsCount";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    const dolls = await DollModel.find({
      dollName: { $regex: search, $options: "i" },
    })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);
    const total = await DollModel.countDocuments({
      dollName: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      dolls,
    };
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can`t get dolls!",
    });
  }
};

export const getDollsCarousel = async (req, res) => {
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
