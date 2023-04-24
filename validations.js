import { body } from "express-validator";

export const loginValidation = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password should contain at least 8 symbols").isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password should contain at least 8 symbols").isLength({
    min: 8,
  }),
  body("fullName", "Enter your name").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect link of the avatar").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter the title of an article")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Enter the text of an article")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Incorrect tag format (set an array)").optional().isString(),
  body("imageUrl", "Incorrect link of the image").optional().isString(),
];
