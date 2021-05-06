import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      inStock,
      price,
      description,
      content,
      category,
      images,
    } = req.body;

    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Xác thực không hợp lệ." });

    if (
      !title ||
      !inStock ||
      !price ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return res.status(400).json({ err: "Vui lòng điền đầy đủ thông tin." });

    const newProduct = new Products({
      title: title.toLowerCase(),
      inStock,
      price,
      description,
      content,
      category,
      images,
    });
    await newProduct.save();

    res.json({ msg: "Thêm mới sản phẩm thành công!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
