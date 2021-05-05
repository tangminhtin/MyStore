import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";
import { useRouter } from "next/router";
import { patchData } from "../../utils/fetchData";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  const handleSubmit = () => {
    let role = checkAdmin ? "admin" : "user";
    if (num % 2 !== 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch(
          updateItem(
            users,
            editUser._id,
            {
              ...editUser,
              role,
            },
            "ADD_USERS"
          )
        );

        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
    }
  };

  return (
    <div className="table-responsive shadow rounded-bottom">
      <Head>
        <title>Cập nhật thông tin người dùng</title>
      </Head>

      <h1 className="text-uppercase text-center p-3 text-primary">
        Cập nhật thông tin người dùng
      </h1>
      <div className="col-md-5 mx-auto my-4 p-4">
        <div className="form-group my-4">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>
        <div className="form-check form-switch my-4">
          <input
            type="checkbox"
            className="form-check-input"
            name="isAdmin"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor="isAdmin" className="form-check-label">
            Đánh dấu là quản trị viên
          </label>
        </div>
        <button className="btn btn-warning shadow" onClick={handleSubmit}>
          Cập nhật
        </button>
      </div>

      <div className="d-flex justify-content-between p-4">
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
        </button>
      </div>
    </div>
  );
};

export default EditUser;
