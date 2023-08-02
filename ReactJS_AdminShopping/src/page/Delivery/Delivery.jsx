import React from "react";
import "./delivery.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import TableTransaction from "../../components/TableTransaction/TableTransaction";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HeaderPage from "../../components/HeaderPage/HeaderPage";

const Delivery = () => {
  const [approveOrder, setApproveOrder] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/");
        setApproveOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getAllOrder();
  }, []);

  const approveData = approveOrder.filter((item) => item.status === "Approved");

  return (
    <div className="Delivery">
      <Slider />
      <div className="DeliveryContainer">
        <Navbar />
        <HeaderPage
          title="Order"
          icon={<LocalShippingIcon />}
          subtitle="Order was approve"
        />
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableTransaction approve={approveData} />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
