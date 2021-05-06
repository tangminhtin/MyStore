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
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Tập tin không tồn tại." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024 * 5)
        return (err = "Hình ảnh có kích thước tối đa là 5MB.");

      if (
        file.type !== "image/jpeg" &&
        file.type != "image/png" &&
        file.type != "image/gif"
      )
        return (err = "Sai định dạng hình ảnh.");

      num += 1;
      if (num <= 20) newImages.push(file);

      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 20)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Chọn tối đa 20 hình ảnh." },
      });

    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Xác thực không hợp lệ." },
      });

    if (
      !title ||
      !inStock ||
      !price ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Vui lòng điền đầy đủ thông tin." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    }

    setProduct(initialStatte);
    setImages([]);
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div>
      <Head>
        <title>Thêm mới sản phẩm</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="imagesFile" className="form-label">
            Thêm hình ảnh
          </label>
          <div className="input-group mb-3 border rounded">
            <input
              type="file"
              className="form-control"
              style={{ opacity: 0 }}
              title="Chọn hình ảnh"
              id="imagesFile"
              multiple
              accept="images/*"
              onChange={handleUploadInput}
            />
            <label className="input-group-text" htmlFor="imagesFile">
              Chọn hình ảnh
            </label>
          </div>
          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt={img.url}
                  className="img-thumbnail rounded"
                />
                <span onClick={() => deleteImage(index)}>
                  <i className="fas fa-trash-alt" aria-hidden></i>
                </span>
              </div>
            ))}
          </div>
        </div>

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
            <select
              className="form-select"
              id="category"
              name="category"
              value={category}
              onChange={handleChangeInput}
            >
              <option value="all">Chọn danh mục</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
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
          <button type="submit" className="btn btn-warning">
            {onEdit ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
