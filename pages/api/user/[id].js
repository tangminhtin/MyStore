import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.query;
    const { role } = req.body;

    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Xác thực không hợp lệ." });

    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: "Cập nhật thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Xác thực không hợp lệ." });

    console.log(id);

    await Users.findByIdAndDelete(id);
    res.json({ msg: "Xóa thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
