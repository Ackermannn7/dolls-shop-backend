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
  body("fullName", "Enter your name").isLength({ min: 2 }),
  body("avatarUrl", "Incorrect link of the avatar").optional(),
];

// export const postCreateValidation = [
//   body(
//     "title",
//     "The title of the article should be at least 3 characters long!"
//   )
//     .isLength({ min: 3 })
//     .isString(),
//   body("text", "The text of the article should be at least 3 characters long!")
//     .isLength({
//       min: 3,
//     })
//     .isString(),
//   body("tags", "Incorrect tag format").optional().isString(),
//   body("imageUrl", "Incorrect link of the image").optional().isString(),
// ];
