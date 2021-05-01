import Link from "next/link";
import { decrease, increase } from "../store/Actions";

const CartItem = ({ item, dispatch, cart }) => {
  return (
    <tr>
      <td style={{ width: "100px", overflow: "hidden" }}>
        <img
          src={item.images[0].url}
          alt={item.images[0].url}
          className="img-thumbnail w-100"
          style={{ minWidth: "80px", height: "80px" }}
        />
      </td>
      <td style={{ minWidth: "200px" }} className="w-50 align-middle">
        <h5 className="text-capitalize text-secondary">
          <Link href={`product/${item._id}`}>
            <a>{item.title}</a>
          </Link>
        </h5>
        <h6 className="text-danger">{item.quantity * item.price}₫</h6>
        {item.inStock > 0 ? (
          <p className="text-danger">Kho còn: {item.inStock}</p>
        ) : (
          <p className="text-danger">Hết hàng</p>
        )}
      </td>
      <td className="align-middle" style={{ minWidth: "150px" }}>
        <button
          className="btn btn-outline-secondary"
          disabled={item.quantity === 1 ? true : false}
          onClick={() => dispatch(decrease(cart, item._id))}
        >
          -
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          className="btn btn-outline-secondary"
          disabled={item.quantity === item.inStock ? true : false}
          onClick={() => dispatch(increase(cart, item._id))}
        >
          +
        </button>
      </td>
      <td
        className="align-middle"
        style={{ minWidth: "50px", cursor: "pointer" }}
      >
        <i className="far fa-trash-alt text-danger"></i>
      </td>
    </tr>
  );
};

export default CartItem;
