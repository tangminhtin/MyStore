import React, { useState, useEffect } from "react";
import filterSearch from "../utils/filterSearch";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Filter = ({ state }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const { categories } = state;
  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({
      router,
      search: search ? search.toLocaleLowerCase() : "all",
    });
  }, [search]);

  return (
    <div className="input-group">
      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="text-capitalize"
          value={category}
          onChange={handleCategory}
        >
          <option value="all">Tất cả sản phẩm</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <form autoComplete="off" className="mt-2 col-md-8 px-0">
        <input
          type="text"
          className="form-control"
          list="title_product"
          value={search.toLocaleLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select className="text-capitalize" value={sort} onChange={handleSort}>
          <option value="-createdAt">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="-sold">Bán chạy</option>
          <option value="-price">Giá: Cao - Thấp</option>
          <option value="price">Giá: Thấp - Cao</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
