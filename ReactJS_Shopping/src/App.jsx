import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Order from "./pages/Order";
import Error from "./pages/Error";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Orders from "./pages/Orders.jsx";

function App() {
  const TOKEN = Cookies.get("userInfo");
  const user = TOKEN ? jwtDecode(TOKEN).username : null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:category/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Error />} />
      <Route
        path="/auths/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/auths/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      {user && <Route path="/orders" element={<Orders />} />}
    </Routes>
  );
}

export default App;
