import { useContext, useEffect, useState } from "react";
import { fetchCategoriePath } from "helper/ProductPageHelper";

import TopBanner from "./TopBanner";
import Content from "./Content";

import styles from "styles/Checkout/Checkout.module.css";
import CartContext from "components/NavBar/Cart/context";
import useFetchAuth from "hooks/useFetchAuth";

export default function Checkout() {
  const { fetchAuth: fetch } = useFetchAuth()
  const cartContext = useContext(CartContext);

  const urlProposal = `${process.env.NEXT_PUBLIC_HOST}/proposal`;
  const urlSeller = `${process.env.NEXT_PUBLIC_HOST}/seller`;
  const urlProduct = `${process.env.NEXT_PUBLIC_HOST}/product`;

  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const step = useState(1);

  useEffect(() => {
    const fetchAditional = (cartItems) => {
      return cartItems.map((item) => {
        const proposalInfo = fetch(`${urlProposal}/${item.proposal_id}`)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            return {
              stock: json.data.stock,
              max_quantity: json.data.maxPerPurchase,
            };
          });
        const categoriesPath = fetch(`${urlProduct}/${item.product_id}`)
          .then((res) => {
            return res.json();
          })
          .then(({ data }) => {
            return fetchCategoriePath(data.category_id);
          });
        const sellerInfo = fetch(`${urlSeller}/${item.seller_id}`)
        .then((res) => {
          return res.json();
        })
        .then(({data}) => {
          return {
            seller: { id: data.userId, name: data.companyName, rating: data.rating },
          };
        })

        return Promise.all([proposalInfo, categoriesPath,sellerInfo]).then(
          ([proposalInfo, categoriesPath, sellerInfo]) => {
            let categoriesPathString = "";
            for (let i = 0; i < categoriesPath.length; i++) {
              if (i == categoriesPath.length - 1)
                categoriesPathString = categoriesPathString.concat(
                  categoriesPath[i]
                );
              else
                categoriesPathString = categoriesPathString
                  .concat(categoriesPath[i])
                  .concat(" - ");
            }
            return {
              ...item,
              ...proposalInfo,
              category: categoriesPathString,
              ...sellerInfo,
            };
          }
        );
      });
    };
    
    if (cartContext.loading){
      setLoading(true)
    }

    if (!cartContext.loading && loading) {
      Promise.all(fetchAditional(cartContext.cart)).then((items) => {
        setBasket(items);
        setLoading(false);
      });
    }
  }, [loading, cartContext, urlProposal, urlProduct, urlSeller, fetch]);

  return (
    <div className={styles.bg}>
      <TopBanner />
      <Content step={step} basket={[basket, setBasket]} />
    </div>
  );
}
