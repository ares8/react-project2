import "./App.css";
import Paragraph from "./components/Paragraph/Paragraph";
import { Outlet } from "react-router-dom";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import { ProductsProvider } from "./context/productsContext";
import useAuth from "./hooks/useAuth";
import { StatusProvider } from "./context/statusContext";
function App() {
  useAuth();

  return (
    <AppWrapper>
      <ProductsProvider>
        <StatusProvider>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </StatusProvider>
      </ProductsProvider>
      <Footer>
        <Paragraph paragraphText="Zadanie zaliczeniowe - sem 2" />
      </Footer>
    </AppWrapper>
  );
}

export default App;
