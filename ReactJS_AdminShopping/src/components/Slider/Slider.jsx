import React from "react";
import "./slider.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ThemContext from "../../Context/ThemContext";
const Slider = () => {
  const { selectedColor, handleColorClick } = useContext(ThemContext);
  return (
    <div className="silder">
      <div className="top">
        <span className="logo">lamadmin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <div>MAIN</div>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "green" : "red",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
            to={"/"}
          >
            <li>
              <DashboardIcon className="icon" />
              <p>Dashborad</p>
            </li>
          </NavLink>
          <div>LISTS</div>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "green" : "red",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
            to={"/users"}
          >
            <li>
              <PersonIcon className="icon" />
              <p> Users</p>
            </li>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "green" : "red",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
            to={"/products"}
          >
            <li>
              <StoreIcon className="icon" />
              <p> Products</p>
            </li>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "green" : "red",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
            to={"/orders"}
          >
            <li>
              <AddBusinessIcon className="icon" />
              <p> Orders</p>
            </li>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "green" : "red",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
            to={"/delivery"}
          >
            <li>
              <LocalShippingIcon className="icon" />
              <p>Delivery</p>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom">
        <div>THEME</div>
        <div className="themes">
          <div
            className={`color ${selectedColor === "color1" ? "active" : ""}`}
            onClick={() => handleColorClick("color1")}
          ></div>
          <div
            className={`color ${selectedColor === "color2" ? "active" : ""}`}
            onClick={() => handleColorClick("color2")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
