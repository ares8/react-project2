import { useState } from "react";
import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";
import { useContext } from "react";
import { useEffect } from "react";

const ProductsFilters = () => {
  const { categories, filterProducts } = useContext(ProductsContext);
  const [data, setData] = useState({
    name: "",
    category: "All",
    isFood: false
  });

  useEffect(() => {
    filterProducts(data);
  }, [data, filterProducts]);

  const handleChange = (e) => {
    let value;
    e.target.name !== "isFood"
      ? (value = e.target.value)
      : (value = e.target.checked);
    setData((prevData) => {
      return {
        ...prevData, [e.target.name]: value
      };
    });
  };

  const resetFilter = () => {
    setData({
      name: "",
      category: "All",
      isFood: false
    });
  };

  return <div className="Wrapper">
    <p><strong>Products Filters:&nbsp;</strong></p>
    <form>
      <label>
        by name{" "}
        <input
          name="name"
          type="text"
          placeholder="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>{" "}

      <label>
        by category{" "}
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
        >
          <option key="All" value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          )
          )}
        </select>
      </label>{"  "}

      <label>
        food only
        <input
          name="isFood"
          checked={data.isFood}
          type="checkbox"
          onChange={handleChange}
        />
      </label>{"  "}

      <button type="button" onClick={resetFilter}>
        Reset
      </button>
    </form>
  </div>;
};

export default ProductsFilters;
