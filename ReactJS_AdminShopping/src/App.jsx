import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Theme/style.scss";
import Home from "./components/Home/Home";
import Users from "./page/Users/Users";
import Orders from "./page/Orders/Orders";
import Products from "./page/Products/Products";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import NewProduct from "./page/NewProduct/NewProduct";
import Single from "./page/Single/Single";
import Delivery from "./page/Delivery/Delivery";
import OrderDetail from "./page/OrderDetail/OrderDetail";
import { useContext } from "react";
import ThemContext from "./Context/ThemContext";
import NewUser from "./page/NewUser/NewUser";

function App() {
  const { selectedColor } = useContext(ThemContext);
  return (
    <div className={selectedColor === "color1" ? "" : "dark"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<Single />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetail/:productId" element={<ProductDetail />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/orderDetail/:orderId" element={<OrderDetail />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
