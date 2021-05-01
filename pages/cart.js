import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [total, setTotal] = useState(0);

  const [callback, setCallback] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);

      setTotal(res);
    };
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__cart__minhtin"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, [callback]);

  return (
    <div>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <div>
        {cart.length === 0 ? (
          <div className="d-grid gap-2 justify-content-center text-center">
            <img
              src="/images/empty_cart.gif"
              className="img-fluid"
              alt="Giỏ hàng rỗng!"
            />
            <h1 className="text-danger">Giỏ hàng rỗng!</h1>
          </div>
        ) : (
          <div className="row mx-auto">
            <div className="col-md-8 text-secondary table-responsive my-3">
              <h2 className="text-uppercase">Giỏ hàng</h2>
              <table className="table">
                <tbody>
                  {cart.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      dispatch={dispatch}
                      cart={cart}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 my-3 text-end text-uppercase text-secondary">
              <form>
                <h2>Vận chuyển</h2>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  className="form-control mb-2"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="mobile">Điện thoại</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  className="form-control mb-2"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </form>
              <h3>
                Tổng tiền: <span className="text-danger">{total}₫</span>
              </h3>
              <Link href={"#!"}>
                <a className="btn btn-dark my-2">Tiến hành thanh toán</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
