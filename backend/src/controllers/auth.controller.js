import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({
          errors: errors.array()
        });

    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });


    if (exists)
      return res
        .status(400)
        .json({
          message: "User already exists"
        });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        message: "User registered",
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  }

  catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error",
        error: error.message,
      });
  }
};

export const loginUser = async (req, res) => {

  try {
    const errors = validationResult(req);

    console.log(errors);


    if (!errors.isEmpty())
      return res
                .status(400)
                .json({
                 errors: errors.array()
                    });

    const { email, password } = req.body;

    const user = await User.findOne({ email });


    if (!user)
      return res
               .status(400)
               .json({
                 message: "Invalid credentials"
                 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
               .status(400)
               .json({ 
                message:
                 "Invalid credentials"
                 });



    return res
             .status(200)
             .json({
          message: "Login successful",
          token: generateToken(user._id),
          user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  }

  catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
