import Link from "next/link";
import classes from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const userLink = () => {
    return (
      <>
        <Link href={""}>
          <a className={"btn btn-info w-100 me-1 " + classes.button}>Xem</a>
        </Link>
        <button
          className={"btn btn-success w-100 ms-1 " + classes.button}
          disabled={product.inStock === 0 ? true : false}
          onClick={null}
        >
          Mua
        </button>
      </>
    );
  };

  return (
    <div className="col">
      <div className={"card h-100 " + classes.borderCard}>
        <img
          src={product.images[0].url}
          className={"card-img-top " + classes.borderCard}
          alt={product.images[0].url}
          style={{ height: "200px" }}
        />
        <div className="card-body">
          <h5
            className={"card-title " + classes.cardTitle}
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
