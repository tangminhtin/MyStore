import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  return (
    <div className="my-3">
      <Head>
        <title>Chi tiết đơn hàng {router.query.id}</title>
      </Head>
      <div>
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
        </button>
      </div>

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        {orderDetail.map((order) => (
          <div key={order._id} className="text-uppercase my-3">
            <h2 className="word-break">Đơn hàng {order._id}</h2>
            <div className="mt-4 text-secondary">
              <h4>Thông tin giao hàng</h4>
              <p>Họ và tên: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Địa chỉ: {order.address}</p>
              <p>Số điện thoại: {order.mobile}</p>

              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Đã giao hàng vào ${order.updateAt}`
                  : "Chưa giao hàng"}
              </div>
              <div>
                <h4>Chi tiết sản phẩm</h4>
                {order.cart.map((item) => (
                  <div
                    className="d-flex border-bottom mx-0 p-2 align-items-center align-self-center"
                    key={item._id}
                    style={{ maxWidth: "550px" }}
                  >
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].url}
                      style={{
                        width: "50px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="flex-fill text-secondary px-3 m-0">
                      <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h5>
                    <span className="text-info m-0">
                      {item.quantity} x {item.price}₫ ={" "}
                      {item.quantity * item.price}₫
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailOrder;
