import Link from "next/link";
import PaypalBtn from "./PaypalBtn";
import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      const { paid, dateOfPayment, method, delivered } = res.result;
      dispatch(
        updateItem(
          orders,
          order._id,
          { ...order, paid, dateOfPayment, method, delivered },
          "ADD_ORDERS"
        )
      );

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;

  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          className="row my-3"
          style={{ margin: "20px auto" }}
        >
          <div className="col-md-8 my-3">
            <h2 className="word-break text-uppercase">Đơn hàng {order._id}</h2>
            <div className="mt-4 text-secondary">
              <h4 className="text-uppercase mt-3">Thông tin giao hàng</h4>
              <p>
                Họ và tên:{" "}
                <span className="text-capitalize">{order.user.name}</span>
              </p>
              <p>Email: {order.user.email}</p>
              <p>Địa chỉ: {order.address}</p>
              <p>Số điện thoại: {order.mobile}</p>

              <h4 className="text-uppercase mt-3">Trạng thái đơn hàng</h4>
              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Đã giao hàng vào ${new Date(
                      order.updatedAt
                    ).toLocaleString("vi-VN")}`
                  : "Chưa giao hàng"}
                {auth.user.role === "admin" && !order.delivered && (
                  <button
                    className="btn btn-dark"
                    onClick={() => handleDelivered(order)}
                  >
                    Đánh dấu là đã giao hàng
                  </button>
                )}
              </div>

              <h4 className="text-uppercase mt-3">Thanh toán</h4>
              {order.method && (
                <p>
                  Hình thức thanh toán: <em>{order.method}</em>
                </p>
              )}
              {order.paymentId && (
                <p>
                  ID thanh toán: <em>{order.paymentId}</em>
                </p>
              )}
              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.paid
                  ? `Đã thanh toán vào ${new Date(
                      order.dateOfPayment
                    ).toLocaleString("vi-VN")}`
                  : "Chưa thanh toán"}
              </div>

              <div>
                <h4 className="text-uppercase mt-3">Chi tiết sản phẩm</h4>
                {order.cart.map((item) => (
                  <div
                    className="d-flex border-bottom mx-0 p-2 align-items-center align-self-center"
                    key={item._id}
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
                    <h6 className="flex-fill text-secondary px-3 m-0">
                      <Link href={`/product/${item._id}`}>
                        <a className="text-capitalize">{item.title}</a>
                      </Link>
                    </h6>
                    <span className="text-info m-0">
                      {item.quantity} x {item.price}₫ ={" "}
                      {item.quantity * item.price}₫
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <h2 className="mb-4 text-uppercase text-danger text-end">
              Tổng tiền: {order.total}₫
            </h2>
            {!order.paid && auth.user.role !== "admin" && (
              <PaypalBtn order={order} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
