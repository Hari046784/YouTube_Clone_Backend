import express from "express";
import { googleAuth, signin, signout, signup } from "../controllers/auth.controller.js";
const router = express.Router();

//create user account
router.post('/signup', signup);

//signin for user account
router.post('/signin', signin);

//google authentication
router.post('/google', googleAuth);

//signout
router.get('/signout', signout);

export default router;