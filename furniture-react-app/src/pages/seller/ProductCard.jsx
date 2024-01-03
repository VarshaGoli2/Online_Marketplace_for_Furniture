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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleDelete = async (id, username) => {
  try {
    // Make DELETE request to the server
    await axios.delete(
      `http://localhost:5001/products/delete/${id}/${username}`
    );

    // Show success toast
    toast.success("Product deleted successfully", {
      position: "top-right",
      autoClose: 100, // Close the toast after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    // Optionally, you can update the UI by removing the deleted product from the state
    // or triggering a re-fetch of the product list.
  } catch (error) {
    console.error("Error deleting product:", error, { autoClose: 10 });

    // Show error toast
    toast.error("Error deleting product", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

const ProductCard = (props) => {

  const navigate = useNavigate();

  const handleEdit = (id, username) => {
    try {
      navigate(`/seller/edit_product/${username}/${id}`);
    } catch (error) {
      console.error("Error Editing Product", error);
    }
  };

  const { id, title, category, price, username, image_link } = props;
  return (
    <Col className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img style={{height:'253.56px'}} whileHover={{ scale: 0.9 }} src={image_link} alt="Invalid Image Link" />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${id}`}>{title}</Link>
          </h3>
          <span>{category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2" style={{width:'200px'}}>
          <span className="price">${price}</span>
          <motion.span
            whileTap={{ scale: 1.2 }}
            onClick={() => handleEdit(id, username)}
          >
            <EditIcon/>
          </motion.span>
          <motion.span
            whileTap={{ scale: 1.2 }}
            onClick={() => handleDelete(id, username)}
          >
            <DeleteIcon/>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
