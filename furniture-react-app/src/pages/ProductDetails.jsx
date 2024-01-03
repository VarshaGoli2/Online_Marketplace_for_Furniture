import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import "../styles/productDetails.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import { motion } from "framer-motion";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      console.log("hello fetched product --", product);
      try {
        // Fetch user info to get the sell_products_id
        const product_detail = await axios.get(
          `http://localhost:5001/products/details/${id}`
        );
        setProduct(product_detail.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchProduct();
  }, []);

  const { image_link, title, description } = product;
  const price = product.price;
  const mrp = price?.mrp;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image_link,
        price:mrp,
        shipping_cost:price?.shipping_cost,
        tax:price?.tax,
        seller_id: product?.seller_id
      })
    );

    toast.success("Product added to cart successfully!", { autoClose: 5 });
  };

  return (
    <Helmet title={title}>
      <CommonSection title={title} />
      {JSON.stringify(product) === "{}" ? (
        <h1>Loading...</h1>
      ) : (
        <section className="pt-0">
          <Container>
            <Row>
              <Col lg={6} className="mt-3">
                <img src={image_link} alt="" />
              </Col>
              <Col lg-6>
                <div className="product_details mb-3">
                  <h1>
                    <b>{title}</b>
                  </h1>

                  <span className="product_price">${mrp}</span>
                  <p>{description}</p>

                {product.is_sold ? <p style={{color: "red", paddingTop: "3%"}}>Item already sold!</p> : <><motion.button whileTap={{scale: 1.5}} className="buy__btn mt-3" onClick={addToCart}>Add to Cart</motion.button><br/></>}
                <motion.button whileTap={{scale: 1.5}} className="buy__btn mt-3" onClick={() => window.location.href = '/shop'}>Back</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section> )}
    </Helmet>
  );
};

export default ProductDetails;
