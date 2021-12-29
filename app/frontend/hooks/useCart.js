import { useEffect, useState } from "react"


const useCart = () => {

    const urlCart = `${process.env.NEXT_PUBLIC_HOST}/cart`
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
      const fetchApi = () => {
        fetch(urlCart)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setData(json.data);
            setLoading(false);
          });
      };
      if ( loading )
        fetchApi();
    }, [urlCart,loading]);

    const addItem = (id,quantity) => {
        fetch(urlCart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({proposal_id:id,quantity:quantity})
        }).then( () => setLoading(true) )
    }

    const deleteItem = (id) => {
      fetch(`${urlCart}/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then( () => setLoading(true) )
    }

    const updateItem = (id,quantity) => {
      fetch(`${urlCart}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: quantity
          })
      }).then( () => setLoading(true) )
    }

    const handleCartVisibility = () => {
      showCart ? setShowCart(false) : setShowCart(true)
    }

    return { showCart, handleCartVisibility, loading, data, addItem , deleteItem , updateItem };
};

export default useCart;