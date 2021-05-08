import React, { useState, useEffect } from "react";
import filterSearch from "../utils/filterSearch";
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
    <div className="row justify-content-between pt-3 fw-bold">
      <div className="col text-start">
        <label className="p-2 rounded" htmlFor="filter">
          Lọc theo
        </label>
        <select
          className="text-capitalize p-1 rounded shadow border-warning"
          style={{}}
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

      <div className="col text-end">
        <label className="p-2 rounded" htmlFor="sort">
          Sắp xếp theo
        </label>
        <select
          className="text-capitalize p-1 rounded shadow border-warning"
          id="sort"
          value={sort}
          onChange={handleSort}
        >
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
