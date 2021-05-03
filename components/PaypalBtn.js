import { useEffect, useRef, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { patchData } from "../utils/fetchData";

const paypalBtn = ({ order }) => {
  const refPaypalBtn = useRef();
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.total,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          dispatch({ type: "NOTIFY", payload: { loading: true } });

          return actions.order.capture().then(function (details) {
            patchData(`order/${order._id}`, null, auth.token).then((res) => {
              if (res.err)
                return dispatch({ type: "NOTIFY", payload: { err: res.err } });

              dispatch(
                updateItem(
                  orders,
                  order._id,
                  {
                    ...order,
                    paid: true,
                    dateOfPayment: new Date().toISOString(),
                  },
                  "ADD_ORDERS"
                )
              );

              return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
              });
            });
          });
        },
      })
      .render(refPaypalBtn.current);
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default paypalBtn;
