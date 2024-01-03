import {createSlice} from "@reduxjs/toolkit"

const persistedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
    cartItems: persistedCartItems,
    totalAmount:0,
    totalQuantity:0,
    totalShippingCost:0,
    totalTax:0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem:(state, action) => {
            console.log("Add Item!")
            const newItem = action.payload
            const existingItem = state.cartItems.find(
                (item)=>item.id === newItem.id
            );
            state.totalQuantity++

            if(!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    image_link: newItem.image_link,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    shipping_cost:newItem?.shipping_cost,
                    tax:newItem?.tax,
                    seller_id: newItem.seller_id,
                })
            }
            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + 
            Number(item.price) * Number(item.quantity), 0);

            state.totalShippingCost = state.cartItems.reduce(
                (total, item) => total + 
            Number(item.shipping_cost) * Number(item.quantity), 0);

            state.totalTax = state.cartItems.reduce(
                (total, item) => total + 
            Number(item.tax) * Number(item.quantity), 0);

            console.log(state.totalQuantity);
            console.log(state.cartItems);
            console.log(newItem);
        },

        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)

            if(existingItem) {
                state.cartItems = state.cartItems.filter(item=> item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + 
                Number(item.price) * Number(item.quantity), 0);

            state.totalShippingCost = state.cartItems.reduce((total, item) => total + 
                Number(item.shipping_cost) * Number(item.quantity), 0);

            state.totalTax = state.cartItems.reduce((total, item) => total + 
                Number(item.tax) * Number(item.quantity), 0);
        },

        setCartItems: (state, action) => {
            console.log("Set Item");
            const items = action.payload;
            
            // Assuming items is an array of cart items
            state.cartItems = [...items];
      
            // Update totalQuantity and totalAmount based on the new cartItems
            state.totalQuantity = state.cartItems.reduce(
              (total, item) => total + item.quantity,
              0
            );
      
            state.totalAmount = state.cartItems.reduce(
              (total, item) => total + item.totalPrice,
              0
            );

            state.totalShippingCost = state.cartItems.reduce(
                (total, item) => total + item.shipping_cost,
                0
            );

            state.totalTax = state.cartItems.reduce(
            (total, item) => total + item.tax,
            0
            );
          },

          clearCart: (state) => {
            console.log("Clearing cart")
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            state.totalShippingCost = 0;
            state.totalTax = 0;
            localStorage.removeItem("cartItems")
          },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;