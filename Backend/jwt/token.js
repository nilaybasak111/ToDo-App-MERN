import jwt from "jsonwebtoken";
import User from "../Model/userSchema.js";

export const generateTokenAndSaveInCookies = async (UserId, res) => {
  const token = jwt.sign({ UserId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
    // expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  // 10 days expiry time
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(UserId, { token });
  return token;
};
