import React, { useState } from "react";
import "./UserOption.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Support from "@mui/icons-material/ReportProblem";
import HeartIcon from "@mui/icons-material/FavoriteBorder";
// import HeartActiveIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxSlices/userSlice";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserData = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);


  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scroolEffect = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".speedDial").classList.add("active");
    } else {
      document.querySelector(".speedDial").classList.remove("active");
    }
  });

  const dispatch = useDispatch();

  const userOption = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },

    {
      icon: (<ShoppingCartIcon style={{color: cartItems.length === 0 ? "" : "tomato",}} />),
      name: `Cart (${cartItems.length})`,
      func: cart,
  },
  {
    icon: (<HeartIcon style={{ color: favouriteItems.length === 0 ? "" : "tomato",}}/>),
    name: `Favourite (${favouriteItems.length})`,
    func: favourite,
  },

  { icon: <PersonIcon />, name: "Profile", func: account },
  { icon: <Support />, name: "Report us", func: report },
  { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  const adminOption = [
    {icon: <DashboardIcon />,name: "Dashboard", func: dashboard},
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ]

  // const options = [
  //   { icon: <HomeIcon />, name: "Home", func: home },
  //   { icon: <ListAltIcon />, name: "Orders", func: orders },
    
  //   {
  //       icon: (<ShoppingCartIcon style={{color: cartItems.length === 0 ? "" : "tomato",}} />),
  //       name: `Cart (${cartItems.length})`,
  //       func: cart,
  //   },
  //   {
  //     icon: (<HeartIcon style={{ color: favouriteItems.length === 0 ? "" : "tomato",}}/>),
  //     name: `Favourite (${favouriteItems.length})`,
  //     func: favourite,
  //   },

  //   { icon: <PersonIcon />, name: "Profile", func: account },
  //   { icon: <Support />, name: "Report us", func: report },
  //   { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  // ];

  // if (user.role === "admin") {
  //   options.unshift({
  //     icon: <DashboardIcon />,
  //     name: "Dashboard",
  //     func: dashboard,
  //   });
  // }

  // if (user.role === "Creator") {
  //   options.unshift({
  //     icon: <DashboardIcon />,
  //     name: "Dashboard",
  //     func: dashboard,
  //   });
  // }

  if (user.role === "Creator") {
    userOption.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function home() {
    navigate("/");
  }

  function orders(){
    if(user.role === "admin"){
      navigate("/admin/orders");
    }
    else{
      navigate("/orders");
    }
    
  }

  function cart() {
    navigate("/cart");
  }
  function favourite() {
    navigate("/favourites");
  }
  function account() {
    navigate("/me");
  }

  function report() {
    navigate("/support");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        useRef={scroolEffect}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./profile.png"}
            alt="Profile"
            style={{
              position: "fixed",
            }}
          />
        }
      >
        {user.role === "admin" ? 
        (adminOption.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))) :
        (userOption.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        )))
      }
      </SpeedDial>
    </>
  );
};

export default UserData;
