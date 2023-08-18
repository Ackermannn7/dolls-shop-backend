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
import checkTokenExpiration from "./utils/checkTokenExpiration.js";

mongoose
  .connect(process.env.MONGO_URI)
  // .connect(
  //   "mongodb+srv://admin:Qweasdzxc@cluster0.s7bwyba.mongodb.net/dolls-shop"
  // )
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
app.use(checkTokenExpiration);

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
app.get("/auth/logout", checkAuth, UserController.logout);
app.patch("/auth/updateUser", checkAuth, UserController.update);
app.post("/auth/forgotPassword", UserController.forgotPassword);
app.put("/auth/resetPassword/:token", UserController.resetPassword);
app.put("/auth/changePassword", checkAuth, UserController.changePassword);

app.listen(process.env.PORT || 4444, (err) => {
  // app.listen(4444, (err) => {
  if (err) console.log(err);
  console.log(`Server is ok!`);
});
