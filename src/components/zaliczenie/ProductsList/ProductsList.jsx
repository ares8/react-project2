import "../commonStyles.css";
import { useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { ProductsContext } from "../../../context/productsContext";
import { StatusContext } from "../../../context/statusContext";
import { LinearProgress } from "@mui/material";

const ProductsList = () => {
  const { filteredList, setFilteredList, setProductsList, setShoppingList } = useContext(ProductsContext);
  const { responseStatus, setResponseStatus } = useContext(StatusContext);

  const baseUrl = "http://localhost:4000/api";

  const loadProductsList = async (url) => {
    setResponseStatus("loading products");
    try {
      const products = await axios.get(url);
      setResponseStatus("success");
      setProductsList(products.data);
      setFilteredList(products.data);
    } catch (error) {
      console.error(error);
      setResponseStatus("failed");
    }
  };

  const loadShoppingList = useCallback(async (url) => {
    setResponseStatus("loading shopping");
    try {
      const shopping = await axios.get(url);
      setResponseStatus("success");
      setShoppingList(shopping.data);
    } catch (error) {
      console.error(error);
      setResponseStatus("failed");
    }
  }, [setShoppingList, setResponseStatus]);


  const addProduct = async (url, product) => {
    setResponseStatus("sending");
    try {
      await axios.post(url, product);
      setResponseStatus("success");
      loadShoppingList(url);
    } catch (error) {
      console.error(error);
      setResponseStatus("failed");
    }
  };

  useEffect(() => {
    loadShoppingList(`${baseUrl}/shoppingList`)
  }, [loadShoppingList]);

  return (
    <div className="App">

      <header className="AppHeader">
        <p>Products list</p>
        <p>
          <button onClick={() => loadProductsList(`${baseUrl}/productsList`)}>
            Załaduj
          </button>
        </p>

        {responseStatus === "loading products" ? (
          <p className="info">
            <LinearProgress />
            Ładowanie produktów
          </p>
        ) : (
          <ul>
            {filteredList.map((product) => (
              <li key={product.id} onClick={() => addProduct(`${baseUrl}/shoppingList`, product)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}

        {responseStatus === "sending" &&
          <p className="info">
            <LinearProgress />
            Dodawanie produktu
          </p>
        }
      </header>
    </div>
  );
};

export default ProductsList;
