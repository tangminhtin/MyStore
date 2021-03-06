import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import OrderDetail from "../../components/OrderDetail";

const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  if (!auth.user) return null;

  return (
    <div className="my-3">
      <Head>
        <title>Chi tiết đơn hàng {router.query.id}</title>
      </Head>

      <OrderDetail
        orderDetail={orderDetail}
        state={state}
        dispatch={dispatch}
      />

      <div className="d-flex justify-content-between">
        <button className="btn btn-dark" onClick={() => router.back()}>
          <i className="fas fa-arrow-circle-left" aria-hidden></i> Trở về
        </button>
        <button className="btn btn-dark" onClick={() => router.push("/")}>
          Mua tiếp <i className="fas fa-arrow-circle-right" aria-hidden></i>
        </button>
      </div>
    </div>
  );
};

export default DetailOrder;
