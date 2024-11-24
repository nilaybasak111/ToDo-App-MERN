import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);

export default router;
