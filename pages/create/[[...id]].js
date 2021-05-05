import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { getData, postData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";

const NewProduct = () => {
  const initialStatte = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };

  const [product, setProduct] = useState(initialStatte);
  const { title, price, inStock, description, content, category } = product;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialStatte);
      setImages([]);
    }
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {};

  const deleteImage = (index) => {};

  const handleSubmit = async (e) => {};

  return (
    <div>
      <Head>Thêm mới sản phẩm</Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Tên sản phẩm
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="inStock" className="form-label">
                Số lượng
              </label>
              <input
                className="form-control"
                type="number"
                id="inStock"
                name="inStock"
                value={inStock}
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">
                Giá tiền
              </label>
              <input
                className="form-control"
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="category">
              Danh mục
            </label>
            <select className="form-select" id="category">
              <option defaultValue>Chọn danh mục</option>
              <option value="1">Cafe</option>
              <option value="2">Gạo</option>
              <option value="3">Mỹ phẩm</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Mô tả
            </label>
            <textarea
              className="form-control"
              rows="5"
              id="description"
              name="description"
              value={description}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Nội dung
            </label>
            <textarea
              className="form-control"
              rows="10"
              id="content"
              name="content"
              value={content}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <button type="button" className="btn btn-warning">
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
