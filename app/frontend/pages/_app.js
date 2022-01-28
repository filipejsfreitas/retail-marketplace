import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import CartContext from "components/NavBar/Cart/context"
import useCart from 'hooks/useCart';
import TokenContext from 'components/Context/TokenContext';
import useToken from 'hooks/useToken';
import React from "react";


// This wraps up every page components, so the Layout will be displayed in every page
function MyApp({ Component, pageProps }) {

  const { showCart, handleCartVisibility, loading, data, addItem, deleteItem, updateItem, reload } = useCart();

  const context = {
    loading: loading,
    visible: showCart,
    handleVisible: handleCartVisibility,
    cart: data ? data : [],
    addItem: addItem,
    deleteItem: deleteItem,
    updateItem: updateItem,
    reloadCart: reload
  }

  return (
    <TokenContext.Provider value={useToken()}>
      <CartContext.Provider value={context}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </TokenContext.Provider>
  )
}

export default MyApp