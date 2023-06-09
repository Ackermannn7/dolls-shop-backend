import express from "express";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation, loginValidation } from "./validations.js";

import {
  UserController,
  DollsController,
  GalleryController,
  CommentsController,
  CartController,
} from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

// database
// "mongodb+srv://admin:Qweasdzxc@cluster0.s7bwyba.mongodb.net/dolls-shop"

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "avatars");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/photos", express.static("photos"));
app.use("/avatars", express.static("avatars"));

//avatar upload
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `avatars/${req.file.originalname}`,
  });
});

//dolls controller
app.get("/dolls", DollsController.getAllDolls);
app.get("/dollsCarousel", DollsController.getDollsCarousel);
app.get("/dolls/:id", DollsController.getOne);
app.post("/dolls", checkAuth, DollsController.createDoll);

//comments controller
app.post("/comments/:id", checkAuth, CommentsController.createComment);
app.get("/dolls/comments/:id", DollsController.getComments);

//gallery controllers
app.get("/gallery", GalleryController.getGallery);
app.post("/addPhoto", GalleryController.addPhoto);

//order controllers
app.post("/saveOrder", checkAuth, CartController.saveOrder);
app.get("/orderHistory/:id", checkAuth, CartController.getOrders);
app.get("/order/:id", checkAuth, CartController.getOneOrder);

//user controllers
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.patch("/auth/updateUser", checkAuth, UserController.update);

// app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
//   res.json({
//     url: `uploads/${req.file.originalname}`,
//   });
// });
// app.get("/tags", PostController.getLastTags);
// app.get("/posts", PostController.getAll);
// app.get("/posts/tags", PostController.getLastTags);
// app.get("/posts/:id", PostController.getOne);

// app.post(
//   "/posts",
//   checkAuth,
//   postCreateValidation,
//   handleValidationErrors,
//   PostController.create
// );
// app.delete("/posts/:id", checkAuth, PostController.remove);
// app.patch(
//   "/posts/:id",
//   checkAuth,
//   postCreateValidation,
//   handleValidationErrors,
//   PostController.update
// );

app.listen(process.env.PORT || 4444, (err) => {
  if (err) console.log(err);
  console.log(`Server is ok!`);
});
