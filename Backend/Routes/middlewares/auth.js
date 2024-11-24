import jwt from "jsonwebtoken";
import User from "../../Model/userSchema.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(404).json({ msg: "User is Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.UserId);
  } catch (error) {
    return res.status(401).json({ msg: "Error in authMiddleware" + error.msg });
  }
  next();
};
