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

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.category !== "all")
      this.query.find({ category: queryObj.category });

    if (queryObj.title !== "all")
      this.query.find({ category: { $regex: queryObj.title } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;
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
