import React from "react";

import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item._id,
        title: item.title,
        price: item.price.mrp,
        image_link: item.image_link,
        shipping_cost: item.price?.shipping_cost,
        tax: item.price?.tax,
        seller_id: item.seller_id,
      })
    );

    toast.success("Product added successfully.", { autoClose: 5 });
  };

  return (
    <Col
      lg="3"
      md="4"
      className="mb-2"
      style={{
        opacity: `${item.is_sold && 0.7}`,
        cursor: `${item.is_sold && "not-allowed !important"}`,
      }}
    >
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.image_link}
            alt=""
            style={{ height: "255.55px", opacity:  `${item.is_sold && 0.5}`}}
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item._id}`}>{item.title}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item?.price?.mrp}</span>
          {!item.is_sold ? <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <AddCircleIcon />
          </motion.span> : <p style={{color: 'red'}}>Item already sold!</p>}
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
