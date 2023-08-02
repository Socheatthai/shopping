import React from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import SearchContext from "../../Context/SearchContext";
const Navbar = () => {
  const { setSearchOrder, searchOrder } = useContext(SearchContext);
  const handleSearchInputChange = (event) => {
    setSearchOrder(event.target.value);
  };
  return (
    <div className="navbarContainer">
      <div className="leftContainer">
        <input
          type="text"
          placeholder="Search..."
          value={searchOrder}
          onChange={handleSearchInputChange}
        />
        <SearchIcon />
      </div>
      <div className="rightContainer">
        <div className="langauge">
          <LanguageIcon />
          English
        </div>
        <DarkModeOutlinedIcon className="icons" />
        <FullscreenExitOutlinedIcon className="icons" />
        <NotificationsNoneOutlinedIcon className="icons" />
        <div className="counter1">1</div>
        <ChatBubbleOutlineOutlinedIcon className="icons" />
        <div className="counter2">2</div>
        <ListOutlinedIcon className="icons" />
        <div>
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
