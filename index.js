import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";

import UserModel from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://admin:Qweasdzxc@cluster0.s7bwyba.mongodb.net/dolls-shop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB error!", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("111 Hello World!");
});

app.post("/auth/register", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    fullName: req.body.fullName,
    email: req.body.email,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();
  res.json(user);
});

app.listen(4444, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port 4444");
});
