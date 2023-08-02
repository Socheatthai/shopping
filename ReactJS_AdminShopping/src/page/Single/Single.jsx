import React, { useEffect, useState } from "react";
import "./single.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import Chart from "../../components/Chart/Chart";
import TableTransaction from "../../components/TableTransaction/TableTransaction";
import axios from "axios";
import { useParams } from "react-router-dom";

const Single = () => {
  const [orderData, setOrderData] = useState([]);
  const [income, setIncome] = useState([]);
  const [user, setUser] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userinfo = await axios.get(
          `http://localhost:3000/api/users/find/${userId}`
        );
        setUser(userinfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

      try {
        const orderResponse = await axios.get(
          `http://localhost:3000/api/orders/find/${userId}`
        );
        setOrderData(orderResponse.data);
      } catch (error) {
        // console.error("Error fetching order data:", error);
        // Handle error by setting empty order data
        setOrderData([]);
      }

      try {
        const incomeResponse = await axios.get(
          `http://localhost:3000/api/orders/income/${userId}`
        );
        setIncome(incomeResponse.data);
      } catch (error) {
        // console.error("Error fetching income data:", error);
        // Handle error by setting empty income data
        setIncome([]);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="single">
      <Slider />
      <div className="singleContainer">
        <Navbar />
        <div className="info-chart">
          <div className="userinfo">
            <div className="title">Information</div>
            <div className="content">
              <img src={user && user.avatar} alt="User No Avatar" />
              <div className="user">
                <h1>{user && user.username}</h1>
                <p>Email: {user && user.email}</p>
              </div>
            </div>
          </div>

          <div className="chartUser">
            {income.length > 0 ? (
              <Chart
                aspect={3 / 1}
                title="User Spending (Last 2 Months)"
                data={income}
              />
            ) : (
              <p style={{ textAlign: "center" }}>No income data available</p>
            )}
          </div>
        </div>
        <div className="TableContainer">
          <div className="listTitle">Latest Transactions</div>
          {orderData.length > 0 ? (
            <TableTransaction data={orderData} />
          ) : (
            <p style={{ textAlign: "center" }}>No order data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
