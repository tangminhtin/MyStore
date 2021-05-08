import Head from "next/head";
import Link from "next/link";

const Error = () => {
  return (
    <>
      <Head>
        <title>Trang không toàn tại!</title>
      </Head>
      <div className="container text-center">
        <img className="img-fluid" src="/images/error.gif" alt="error" loading="auto"/>
        <h1 className="text-danger">Không thể truy cập vào trang này!</h1>
        <Link href="/">
          <button className="btn btn-primary rounded-pill p-3 mt-3">
            Nhấn vào đây để tiếp tục
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error;
