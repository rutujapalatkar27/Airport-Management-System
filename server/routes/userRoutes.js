import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();

/// server/flight/new
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

export default router;
