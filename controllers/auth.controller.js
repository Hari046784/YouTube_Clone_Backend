import bcrypt from 'bcrypt';
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { createError } from '../error.js';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log("hash:", hash);
        const newUser = new User({...req.body, password:hash });
        console.log("New User:", newUser);

        await newUser.save();
        res.status(200).send("User has been created successfully!!!")
    } catch (err) {
        next(err);
        console.log("Error:", err);
    };
};

export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) return next(createError(404, 'Invalid credentials'));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
  
      res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
        })
        .status(200)
        .json({ user: others, token: token });
    } catch (err) {
      next(err);
      console.log("Error:", err);
    };
};

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
          })
          .status(200)
          .json({ user: user._doc, token: token });
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
          })
          .status(200)
          .json({ user: savedUser._doc, token: token });
      }
    } catch (err) {
      next(err);
      console.log("Error:", err);
    };
};

export const signout = (req, res) => {
    res.clearCookie('access_token');
    res.json({
        message: 'Successfully Signed out! ',
    });
};