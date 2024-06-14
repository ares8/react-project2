import { createContext, useCallback, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const categories = [...new Set(productsList.map((product) => product.category.toLowerCase()))];

  const filterProducts = useCallback((data) => {
    let filterByData = productsList.filter((product) =>
      product.name.toLowerCase().startsWith(data.name.toLowerCase())
    );

    if (data.category !== "All") {
      filterByData = filterByData.filter((product) => product.category.toLowerCase() === data.category);
    }
    if (data.isFood) {
      filterByData = filterByData.filter((product) => product.isFood);
    }

    setFilteredList(filterByData);
  }, [productsList]);

  return (
    <ProductsContext.Provider value={{ setProductsList, shoppingList, setShoppingList, categories, filteredList, setFilteredList, filterProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
