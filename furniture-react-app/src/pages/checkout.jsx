import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

import "../styles/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate  } from "react-router-dom";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalShippingCost = useSelector(
    (state) => state.cart.totalShippingCost
  );
  const totalTax = useSelector((state) => state.cart.totalTax);
  const prodIds = useSelector((state) =>
    state.cart.cartItems?.map((product) => product.id)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrder = async () => {
    const order = {
      ...formData,
      product_ids: prodIds,
      buyer_id: sessionStorage.getItem("username"),
      mrp: totalAmount,
      shipping_cost: totalShippingCost,
      tax: totalTax,
      seller_id: "admin",
    };
    await axios
      .post("http://localhost:5001/orders/payment", order)
      .then((resp) => {
        dispatch(cartActions.clearCart());
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("totalAmount", 0);
        localStorage.setItem("totalShippingCost", 0);
        localStorage.setItem("totalTax", 0);
        localStorage.setItem("totalQuantity", 0);
        toast.success('Order Placed Successfully', { autoClose: 10 });
        navigate("/shop");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Street address"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Postal code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping :<br />
                  </span>
                  <span>${totalShippingCost}</span>
                </h6>

                <h6>
                  <span>
                    Tax :<br />
                  </span>
                  <span>${totalTax}</span>
                </h6>

                <h4>
                  Total Cost :{" "}
                  <span>${totalAmount + totalShippingCost + totalTax}</span>
                </h4>
                <button
                  className="buy__btn auth__btn w-100"
                  onClick={handleOrder}
                >
                  Place an order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Checkout;
