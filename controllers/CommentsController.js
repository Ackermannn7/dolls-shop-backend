import CommentModel from "../models/Comment.js";
import DollModel from "../models/Doll.js";
// export const getLastTags = async (req, res) => {
//   try {
//     const posts = await PostModel.find().limit(5).exec();
//     const tags = posts
//       .map((obj) => obj.tags)
//       .flat()
//       .slice(0, 5);

//     res.json(tags);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Can't get articles!",
//     });
//   }
// };

// export const getAll = async (req, res) => {
//   try {
//     const posts = await PostModel.find()
//       .populate({ path: "user", select: ["fullName", "avatarUrl"] })
//       .exec();
//     res.json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Can't get articles!",
//     });
//   }
// };

// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const post = await PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: "after",
//       }
//     ).populate("user");
//     res.json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Can't get article!",
//     });
//   }
// };

// export const remove = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     await PostModel.findOneAndDelete({
//       _id: postId,
//     });
//     res.json({
//       success: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Can't get article!",
//     });
//   }
// };

export const createComment = async (req, res) => {
  try {
    const { dollId, comment, userData } = req.body;
    if (!comment)
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty!",
      });
    const newComment = new CommentModel({
      comment,
      fullName: userData.fullName,
      avatarUrl: userData.avatarUrl,
    });
    await newComment.save();
    try {
      await DollModel.findByIdAndUpdate(dollId, {
        $push: { comments: newComment._id },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Can't add comment!",
      });
    }
    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't create comment!",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags.split(","),
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't update article!",
    });
  }
};
