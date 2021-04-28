import Head from "next/head";
import Link from "next/link";

const Signin = () => {
  return (
    <div>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <form className="mx-auto col-md-5 shadow p-3 mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Địa chỉ email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <p className="my-2">
          Bạn chưa có tài khoản?{" "}
          <Link href="/register">
            <a className="text-danger">Đăng ký ngay</a>
          </Link>
        </p>
        <button type="submit" className="btn btn-dark w-100">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Signin;
