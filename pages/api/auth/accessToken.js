import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Đăng nhập ngay!" });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: "Token của bạn không đúng hoặc đã hết hạn" });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "Tài khoản không tồn tại." });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
