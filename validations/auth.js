import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password should contain at least 8 symbols").isLength({
    min: 8,
  }),
  body("fullName", "Enter your name").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect link of the avatar").optional().isURL(),
];
