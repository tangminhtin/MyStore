import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
// import { useRouter } from "next/router";
import ProductItem from "../components/product/ProductItem";
// import filterSearch from "../utils/filterSearch";
// import Filter from "../components/Filter";
import Slider from "../components/Slider";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  // const [page, setPage] = useState(1);

  // const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  // useEffect(() => {
  //   if (Object.keys(router.query).length === 0) setPage(1);
  // }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckAll = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Xóa tất cả các sản phẩm đã chọn?",
          type: "DELETE_PRODUCT",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   filterSearch({ router, page: page + 1 });
  // };

  return (
    <div>
      <Head>
        <title>Lâm Vĩnh Phát</title>
      </Head>
      <Slider />

      {/* <Filter state={state} /> */}

      {auth.user && auth.user.role === "admin" && (
        <div className="d-flex justify-content-end mt-3">
          <div className="btn btn-info p-3 me-2 rounded-pill">
            <input
              type="checkbox"
              className="form-check-input m-0 me-1"
              style={{ height: "25px", width: "25px" }}
              value=""
              id="checkAll"
              checked={isCheck}
              onChange={handleCheckAll}
            />
            <label className="form-check-label text-white" htmlFor="checkAll">
              Chọn tất cả
            </label>
          </div>
          <button
            className="btn btn-danger p-3 ms-2 rounded-pill"
            title="Xóa"
            data-bs-toggle="modal"
            data-bs-target="#itemTrash"
            onClick={handleDeleteAll}
          >
            {" "}
            Xóa các mục đã chọn
          </button>
        </div>

        // <div className="btn btn-danger">
        //   <input type="checkbox" />
        //   <button type="button" className="btn btn-info">
        //     Xóa tất cả
        //   </button>
        // </div>
      )}

      <div className="row row-cols-2 row-cols-md-4 g-4 mt-2">
        {products.length === 0 ? (
          <h2 className="text-danger text-uppercase">Hết sản phẩm</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          ))
        )}
      </div>

      {/* {props.result < page * 6 ? (
        ""
      ) : (
        <button className="btn btn-outline-info mx-auto d-block m-5">
          Xem thêm
        </button>
      )} */}
    </div>
  );
};

export async function getServerSideProps() {
  // const page = query.page || 1;
  // const category = query.category || "all";
  // const sort = query.sort || "";
  // const search = query.search || "all";

  // const res = await getData(
  //   `product?limit=${
  //     page * 6
  //   }&category=${category}&sort=${sort}&title=${search}`
  // );

  const res = await getData("product");

  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Home;
