import "../commonStyles.css";
import { ProductsContext } from "../../../context/productsContext";
import { useContext } from "react";
import axios from "axios";
import { StatusContext } from "../../../context/statusContext";
import { LinearProgress } from "@mui/material";

const ShopingList = () => {
  const { shoppingList, setShoppingList } = useContext(ProductsContext);
  const { responseStatus, setResponseStatus } = useContext(StatusContext);

  const baseUrl = "http://localhost:4000/api/shoppingList";

  const deleteProduct = async (url) => {
    setResponseStatus("deleting");
    try {
      const response = await axios.delete(url);
      setResponseStatus("success");
      const deletedProduct = response.data;
      setShoppingList((prevShoppingList) => prevShoppingList.filter((product) => product.id !== deletedProduct.id));
    } catch (error) {
      console.error(error);
      setResponseStatus("failed");
    }
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <p>Shoping List</p>
        {shoppingList && (
          <ul>
            {shoppingList.map((product) => (
              <li key={product.id} onClick={() => deleteProduct(`${baseUrl}/${product.id}`)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
        {responseStatus === "loading shopping" &&
          <p className="info">
            <LinearProgress />
            Ładowanie zakupów
          </p>
        }

        {responseStatus === "deleting" &&
          <p className="info">
            <LinearProgress />
            Usuwanie produktu
          </p>
        }

      </header>
    </div>
  );
};
export default ShopingList;
