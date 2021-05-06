import Head from "next/head";
import { useState, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { postData, putData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Categories = () => {
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const createCategory = async () => {
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Xác thực không hợp lệ" },
      });

    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Tên danh mục không được bỏ trống." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
    }

    setName("");
    setId("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditCategory = (category) => {
    setId(category._id);
    setName(category.name);
  };

  return (
    <div className="table-responsive shadow rounded-bottom p-4">
      <Head>
        <title>Danh mục sản phẩm</title>
      </Head>
      <h1 className="text-uppercase text-center p-3 text-primary">
        Danh mục sản phẩm
      </h1>

      <div className="col-md-5 mx-auto my-4 p-4">
        <div className="input-group mb-4 shadow">
          <input
            type="text"
            className="form-control"
            placeholder="Danh mục mới"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn btn-warning"
            type="button"
            onClick={createCategory}
          >
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
        {categories.map((category) => (
          <div key={category._id} className="card text-capitalize my-2 shadow">
            <div className="card-body d-flex justify-content-between">
              {category.name}
              <div style={{ cursor: "pointer" }}>
                <i
                  className="fas fa-edit text-info me-2"
                  title="Chỉnh sửa"
                  onClick={() => handleEditCategory(category)}
                ></i>
                <i
                  className="fas fa-trash-alt text-danger ms-2"
                  title="Xóa"
                  data-bs-toggle="modal"
                  data-bs-target="#itemTrash"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: [
                        {
                          data: categories,
                          id: category._id,
                          title: category.name,
                          type: "ADD_CATEGORIES",
                        },
                      ],
                    })
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between p-4">
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
        </button>
      </div>
    </div>
  );
};

export default Categories;
