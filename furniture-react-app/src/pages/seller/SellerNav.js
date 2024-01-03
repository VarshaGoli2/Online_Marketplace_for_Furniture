import { styled } from "@mui/system";
// import React from "react";
// import {useNavigate, useParams} from "react-router-dom";

// const NavText = styled("span")({

// });

// const SellerNav = ({username}) => {

//     const navigate = useNavigate();
//   return (
//     <>
//       <NavContainer>
//         <NavText onClick={() => navigate(`/seller/acc_info/${username}`)}>Account Info</NavText>
//         <NavText onClick={() => navigate(`/seller/add_product/${username}`)}>Add Product</NavText>
//         <NavText onClick={() => navigate(`/seller/product_list/${username}`)}>View Products</NavText>
//         <NavText onClick={() => navigate(`/seller/edit_account_info/${username}`)}>Edit Account Info</NavText>
//       </NavContainer>
//     </>
//   );
// };

// export default SellerNav;

import React, { useRef, useEffect } from "react";

import logo from "../../components/Header/header.css";

import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  width: "100%",
  height: "50px",
  lineHeight: "30px",
  background: "#0a1d37",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
});

const SellerNav = ({ username }) => {

  const nav__link = [
    {
      path: `/seller/acc_info/${username}`,
      display: "Account Info",
    },
    {
      path: `/seller/add_product/${username}`,
      display: "Add Product",
    },
    {
      path: `/seller/product_list/${username}`,
      display: "View Products",
    },
    {
      path: `/seller/edit_account_info/${username}`,
      display: "Update Account Info",
    },
  ];

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <NavContainer>
        <Row>
          <div className="nav__wrapper">
            <div className="navigation"  ref={menuRef} onClick={menuToggle}>
              <motion.ul className="menu" style={{background:'#0a1d37'}}>
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      style={{
                        color: "white",
                      }}
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </motion.ul>
            </div>
            <div className="mobile__menu">
              <span onClick={menuToggle}>
                <MenuIcon sx={{color:'white'}}></MenuIcon>
              </span>
            </div>
          </div>
        </Row>
      </NavContainer>
    </header>
  );
};

export default SellerNav;
