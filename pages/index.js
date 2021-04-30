import Slider from "../components/Slider";
import Head from "next/head";
import { getData } from "../utils/fetchData";
import { useState } from "react";
import ProductItem from "../components/product/ProductItem";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div>
      <Head>
        <title>Lâm Vĩnh Phát</title>
      </Head>
      <Slider />
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("product");

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Home;
