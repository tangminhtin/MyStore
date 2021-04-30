import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  return (
    <div>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <div>
        {cart.length === 0 && (
          <div className="d-grid gap-2 justify-content-center text-center">
            <img
              src="/images/empty_cart.gif"
              class="img-fluid"
              alt="Giỏ hàng rỗng!"
            />
            <h1 className="text-danger">Giỏ hàng rỗng!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
