import Link from "next/link";
import classes from "./ProductItem.module.css";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`}>
          <a className={"btn btn-info w-100 me-1 " + classes.button}>Xem</a>
        </Link>
        <button
          className={"btn btn-success w-100 ms-1 " + classes.button}
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Mua
        </button>
      </>
    );
  };

  return (
    <div className="col" style={{ cursor: "pointer" }}>
      <div className={"card h-100 " + classes.borderCard}>
        <Link href={`product/${product._id}`}>
          <div>
            <img
              src={product.images[0].url}
              className={"card-img-top " + classes.borderCard}
              alt={product.images[0].url}
              style={{ height: "200px" }}
            />
            <div className="card-body">
              <h5
                className={"text-capitalize card-title " + classes.cardTitle}
                title={product.title}
              >
                {product.title}
              </h5>
              <p
                className={"card-text " + classes.cardText}
                title={product.description}
              >
                {product.description}
              </p>
            </div>
          </div>
        </Link>
        <div className={"card-footer " + classes.borderCard}>
          <div className="d-flex justify-content-between">
            <p className="text-danger mb-1">{product.price}₫</p>
            {product.inStock > 0 ? (
              <p className="text-danger mb-1">Kho còn: {product.inStock}</p>
            ) : (
              <p className="text-danger mb-1">Hết hàng</p>
            )}
          </div>
          <div className="d-flex justify-content-between">{userLink()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
