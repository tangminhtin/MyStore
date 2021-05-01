import { useEffect, useRef } from "react";

const paypalBtn = ({ total, address, mobile, state, dispatch }) => {
  const refPaypalBtn = useRef();
  useEffect(() => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log(data);
            alert(
              "Thực hiện giao dịch thành công bởi " +
                details.payer.name.given_name
            );
          });
        },
      })
      .render(refPaypalBtn.current);
  }, []);

  return <div ref={refPaypalBtn}></div>;
};

export default paypalBtn;
