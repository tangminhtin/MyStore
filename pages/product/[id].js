import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    return tab === index ? " active" : "";
  };

  return (
    <div className="row">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="col-md-6 detail_page">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: "350px" }}
        />
        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded ${isActive(index)}`}
              style={{ height: "80px", width: "20%" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6">
        <h2 className="text-uppercase">{product.title}</h2>
        <h5 className="text-danger">{product.price}₫</h5>
        <div className="d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-danger">Kho còn: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Hết hàng</h6>
          )}
          <h6 className="text-danger">Đã bán: {product.sold}</h6>
        </div>
        <div className="my-2">{product.description}</div>
        <div className="my-2">{product.content}</div>
        <button
          type="button"
          className="btn btn-success d-block my-3 px-5"
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Mua
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);

  return {
    props: { product: res.product },
  };
}

export default DetailProduct;
