import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";

const Profile = () => {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    confirm: "",
  };

  const [data, setData] = useState(initialState);
  const { avatar, name, password, confirm } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.userr]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const changeAvatar = (e) => {};

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (password) {
      const errMsg = valid(name, auth.user.email, password, confirm);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    // if (name !== auth.name || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  // const updateInfor = () => {};

  if (!auth.user) return null;

  return (
    <div className="profile_page">
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>

      <section className="row text-secondary my-3">
        <div className="col-md-4">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user"
              ? "Thông tin người dùng"
              : "Thông tin Admin"}
          </h3>
          <div className="avatar">
            <img src={auth.user.avatar} alt="avatar" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Cập nhật</p>
              <input
                type="file"
                id="file_up"
                name="file"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Địa chỉ email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={auth.user.email}
              disabled
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              id="confirm"
              name="confirm"
              value={confirm}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            disabled={notify.loading}
            onClick={handleUpdateProfile}
          >
            Cập nhật
          </button>
        </div>
        <div className="col-md-8"></div>
      </section>
    </div>
  );
};

export default Profile;
