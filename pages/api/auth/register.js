import connectDB from "../../../utils/connectDB";
import valid from "../../../utils/valid";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;

    const errMsg = valid(name, email, password, confirm);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "Email này đã có người sử dụng!" });

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new Users({ name, email, password: passwordHash });

    await newUser.save();
    res.json({ msg: "Đăng ký thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
