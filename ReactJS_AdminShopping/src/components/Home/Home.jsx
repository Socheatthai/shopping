import React, { useEffect, useState } from "react";
import "./home.scss";
import Slider from "../Slider/Slider";
import Navbar from "../Navbar/Navbar";
import Widget from "../Widget/Widget";
import Chart from "../Chart/Chart";
import Feature from "../Feature/Feature";
import TableTransaction from "../TableTransaction/TableTransaction";
import axios from "axios";
const Home = () => {
  const [income, setIncome] = useState([]);
  useEffect(() => {
    const getAllIncome = async () => {
      const res = await axios.get("http://localhost:3000/api/orders/income/");
      setIncome(res.data);
    };
    getAllIncome();
  }, []);
  return (
    <div>
      <div className="homepage">
        <Slider />
        <div className="mainbord">
          <Navbar />
          <div className="warpp">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="anylize">
            <Feature />
            <Chart
              title="Last 2 Months (Revenue)"
              aspect={2 / 1}
              data={income}
            />
          </div>
          {/* <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <TableTransaction home="home" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
