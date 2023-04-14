import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:Qweasdzxc@cluster0.s7bwyba.mongodb.net/dolls-shop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB error!", err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port 4444");
});
