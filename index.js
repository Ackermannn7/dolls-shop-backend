import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin:Qweasdzxc@cluster0.s7bwyba.mongodb.net/dolls-shop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB error!", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
// app.delete("/posts", PostController.remove);
// app.patch("/posts", PostController.update);
app.get("/post", checkAuth, UserController.getMe);
app.get("/post", checkAuth, UserController.getMe);
app.get("/post", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port 4444");
});
