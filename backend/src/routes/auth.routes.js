import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

const validateRegister = [
  
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .exists()
    .withMessage("Password is required"),
];

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
