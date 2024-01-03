import React, { useEffect } from "react";
import "../styles/cart.css"
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Col, Row } from "reactstrap";

import DeleteIcon from '@mui/icons-material/Delete';
import {motion} from "framer-motion"
import { cartActions } from "../redux/slices/cartSlice";
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state=>state.cart.cartItems);
    const totalAmount = useSelector(state=>state.cart.totalAmount);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        dispatch(cartActions.setCartItems(storedCartItems));
    }, [dispatch]);
    
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping Cart"/>
            <section>
                <Container>
                    <Row>
                        <Col lg='9'>
                            {
                                cartItems.length === 0 ? <h2 className="fs-4 text-center">No items added to the cart</h2> : 
                            (
                            <table className="table bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody> {
                                   cartItems.map((item, index) => (
                                    <Tr item={item}  key={index}/>
                                   ))   
                                }     
                                </tbody>
                            </table>)}
                        </Col>
                        <Col lg="3">
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">Subtotal
                                <span className="fs-4 fw-bold">${totalAmount}</span>
                                </h6>
                            </div>
                            <p className="fs-6 mt-2">taxes and shipping will be calculated during checkout</p>
                            <div>
                                <button className="buy__btn w-100 mt-2">
                                    <Link to='/checkout'>Checkout</Link>
                                </button>

                                <button className="buy__btn w-100 mt-3">
                                    <Link to='/shop'>Continue Shopping</Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </section>
        </Helmet>
    );
}

const Tr = ({item})=> {

    const dispatch = useDispatch()

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id))
    }

    return (<tr>
    <td>
        <img src={item.image_link} alt="" />
    </td>
    <td>{item.title}</td>
    <td>${item.price}</td>
    <td>{item.quantity}px</td>
    <td>
        <motion.span whileTap={{scale: 1.2}} onClick={deleteProduct}><DeleteIcon/></motion.span>
    </td>
</tr>)
}

export default Cart;