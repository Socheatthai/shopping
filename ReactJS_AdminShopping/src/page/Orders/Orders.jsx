import React from "react";
import "./order.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import TableTransaction from "../../components/TableTransaction/TableTransaction";
import HeaderPage from "../../components/HeaderPage/HeaderPage";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
const Orders = () => {
  return (
    <div className="Order">
      <Slider />
      <div className="OrderContainer">
        <Navbar />
        <HeaderPage
          title="Order"
          subtitle="Our Order"
          icon={<ShoppingBasketIcon />}
        />
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableTransaction delivery={"Delivery"} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
