import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import { useRouter } from "next/router";

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

  const router = useRouter();

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (password) {
      const errMsg = valid(name, auth.user.email, password, confirm);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if ((name !== auth.name && name) || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Tệp tin không tồn tại." },
      });

    if (file.size > 1024 * 1024 * 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Hình ảnh có kích thước tối đa là 5MB." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Sai định dạng hình ảnh." },
      });

    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;

  return (
    <div className="profile_page">
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>

      <section className="row text-secondary shadow p-4">
        <h1 className="text-uppercase text-center p-3 text-primary">
          Thông tin cá nhân
        </h1>
        <div className="col-md-4 table-responsive">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user"
              ? "Thông tin người dùng"
              : "Thông tin Admin"}
          </h3>
          <div className="avatar shadow">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt="avatar"
            />
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
            className="btn btn-warning my-3"
            disabled={notify.loading}
            onClick={handleUpdateProfile}
          >
            Cập nhật
          </button>
        </div>

        <div className="col-md-8 table-responsive ">
          <h3 className="text-uppercase">Đơn hàng</h3>
          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light fw-bold text-center">
                <tr>
                  <td className="p-2">Mã đơn hàng</td>
                  <td className="p-2">Ngày mua</td>
                  <td className="p-2">Tổng tiền</td>
                  <td className="p-2">Giao hàng</td>
                  <td className="p-2">Thanh toán</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td className="p-2">
                      <Link href={`/order/${order._id}`}>
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="p-2 text-end">{order.total}₫</td>
                    <td className="p-2">
                      {order.delivered ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td className="p-2">
                      {order.paid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-between pb-4 pt-5">
          <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
