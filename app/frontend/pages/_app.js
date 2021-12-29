import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import CartContext from "components/NavBar/Cart/context"
import useCart from 'hooks/useCart';


// This wraps up every page components, so the Layout will be displayed in every page
function MyApp({ Component, pageProps }) {

  const { showCart, handleCartVisibility, loading, data, addItem, deleteItem, updateItem } = useCart();

  const context = {
    loading: loading,
    visible: showCart,
    handleVisible: handleCartVisibility,
    cart: data ? data : [] ,
    addItem: addItem,
    deleteItem: deleteItem,
    updateItem: updateItem
}

  return (
    <CartContext.Provider value={context}>
      <Component {...pageProps} />
    </CartContext.Provider>
    )
}

export default MyApp
