import { useEffect, useState } from "react"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import useToken from "hooks/useToken"
import { UserType } from "hooks/useToken"

const useCart = () => {
    const { fetchAuth: fetch } = useFetchAuth({ onUnauthorized: () => { } })
    const { isReady } = useRouter()
    const { userType } = useToken()

    const urlCart = `${process.env.NEXT_PUBLIC_HOST}/cart`
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
      if(!isReady || userType !== UserType.CLIENT) return
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
    }, [urlCart,loading, userType, isReady]);

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

    const reload = () => {
      setLoading(true)
    }

    return { showCart, handleCartVisibility, loading, data, addItem , deleteItem , updateItem, reload };
};

export default useCart;