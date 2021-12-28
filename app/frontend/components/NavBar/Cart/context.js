import React from "react";

const context = {
    loading: false,
    cart: [],
    addItem: () => {}
}

const CartContext = React.createContext(context);

export default CartContext