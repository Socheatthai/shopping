import React from "react";
import TableUser from "../../components/TableUser/TableUser";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import "./user.scss";
import LineCharts from "../../components/LineCharts/LineChart";
const Users = () => {
  return (
    <div className="list">
      <Slider />
      <div className="listContainer">
        <Navbar />
        <LineCharts />
        <div className="btn">
          {/* <Link to={"/newuser"}>
            <button className="userAddButton">Create</button>
          </Link> */}
        </div>
        <TableUser />
      </div>
    </div>
  );
};

export default Users;
