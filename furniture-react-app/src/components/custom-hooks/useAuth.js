import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const loginCallback = (username) => {
    if(username === 'admin')
      sessionStorage.setItem("isSeller", "true");
    else
      sessionStorage.setItem("isSeller", "false");

    console.log("In loginCallback");
    setLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);
    console.log(username,"Logged in!")
  };

  const logoutCallback = () => {
    console.log("In logout callback")
    setLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", "false");
    console.log("Cart Items Before:",localStorage.getItem("cartItems"))
    localStorage.removeItem("cartItems");
    sessionStorage.removeItem("username")
    console.log("Cart Items After:",localStorage.getItem("cartItems"))
    console.log("Clear cart")
    dispatch(cartActions.clearCart());
    sessionStorage.setItem("isSeller", "false");
  };

  return { isLoggedIn, loginCallback, logoutCallback };
};

export default useAuth;
