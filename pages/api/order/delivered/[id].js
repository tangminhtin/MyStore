import connectDB from "../../../../utils/connectDB";
import Orders from "../../../../models/orderModel";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Xác thực không hợp lệ." });

    const order = await Orders.findOne({ _id: id });
    if (order.paid) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });

      res.json({
        msg: "Cập nhật thành công!",
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Nhận tiền mặt",
          delivered: true,
        }
      );

      res.json({
        msg: "Cập nhật thành công",
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Nhận tiền mặt",
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
