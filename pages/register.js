import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";

const Register = () => {
  const initialState = { name: "", email: "", password: "", confirm: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, confirm } = userData;

  const [state, dispatch] = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirm);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <form
        className="mx-auto col-md-5 shadow p-3 mt-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Địa chỉ email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm" className="form-label">
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm"
            name="confirm"
            value={confirm}
            onChange={handleChangeInput}
          />
        </div>
        <p className="my-2">
          Bạn đã có tài khoản?{" "}
          <Link href="/signin">
            <a className="text-danger">Đăng nhập</a>
          </Link>
        </p>
        <button type="submit" className="btn btn-dark w-100">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
