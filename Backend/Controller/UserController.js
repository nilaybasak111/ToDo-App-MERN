import User from "../Model/userSchema.js";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userSchema = z.object({
  username: z.string().min(4, { msg: "Username Atleast 4 Characters Long" }),
  email: z.string().email({ msg: "Invalid Email Address" }),
  password: z.string().min(4, { msg: "Password Atleast 4 Characters Long" }),
});

export const RegisterUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ $or: [{ email }, { username }] }); // Checking User Available or Not
    if (user) {
      return res.status(400).json({ errormessage: "User Already Exists" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All Fields are Required" });
    }
    // Validating Inputs using Zod
    const inputValidation = userSchema.safeParse({ username, email, password });
    if (!inputValidation.success) {
      const errormessage = inputValidation.error.errors.map(
        (err) => err.message
      );
      return res.status(400).json({ msg: "Error", errormessage });
    }

    // Hashing the Password
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = new User({ username, email, password: hashPassword });
    await newuser.save();
    if (newuser) {
      const token = await generateTokenAndSaveInCookies(newuser._id, res);
      res
        .status(200)
        .json({ msg: "User Registered Successfully", newuser, token });
    }
  } catch (err) {
    console.log("Error is RegisterUser ", err);
    res.status(400).json({ msg: "Server Error in RegisterUser" });
  }
};

export const LoginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "All Fields are Required" });
    }
    const user = await User.findOne({ email }).select("+password"); // Checking Email is Available or Not
    // console.log("this is ", user)
    if (!user) {
      return res.status(400).json({ msg: "No User Found, Please Resigter" });
    }

    // Compareing Two Passwords
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ msg: "Please Enter the Right Password" });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ msg: "User logged in Successfully", user });

  } catch (err) {
    console.log("Error is LoginUser ", err);
    res.status(400).json({ msg: "Server Error in LoginUser" });
  }
};

export const LogoutUser = (req, res) => {
  try {
    res.clearCookie("jwt",{
      path : "/"
    })
    res.status(200).json({ msg: "User logged Out Successfully" });

  } catch (err) {
    console.log("Error is LogoutUser ", err);
    res.status(400).json({ msg: "Server Error in LogoutUser" });
  }
};
