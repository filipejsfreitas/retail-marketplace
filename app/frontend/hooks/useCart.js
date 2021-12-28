import { useEffect, useState, createContext } from "react"


const useCart = () => {

    const url = `${process.env.NEXT_PUBLIC_HOST}/cart`
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
      const fetchApi = () => {
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setData(json);
            setLoading(false);
          });
      };
      if ( loading )
        fetchApi();
    }, [url,loading]);

    const addItem = (id,quantity) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({proposal_id:id,quantity:quantity})
        }).then( () => setLoading(true) )
    }

    const deleteItem = (id) => {
      console.log("aqui")
      fetch(`${url}/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then( () => setLoading(true) )
    }

    const handleCartVisibility = () => {
      showCart ? setShowCart(false) : setShowCart(true)
    }

    return { showCart, handleCartVisibility, loading, data, addItem , deleteItem };
};

export default useCart;