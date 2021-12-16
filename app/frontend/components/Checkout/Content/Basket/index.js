import styles from "styles/Checkout/Content/Basket/Basket.module.css"
import Item from "./Item";

export default function Basket({quantity,basket}) {

    return (
      <div className={styles.box}>
        <div className={styles.title}>
          Basket <span className={styles.titleProdN}>({`${quantity}`} products)</span>
        </div>
        <div className={styles.items}>
          {basket[0].map(({ id, img, title, price, quantity, seller, categorie, stock, max_quantity }) => (
              <Item
                basket={basket}
                key={id}
                id={id}
                img={img}
                title={title}
                price={price}
                quantity={quantity}
                seller={seller}
                categorie={categorie}
                stock={stock}
                max_quantity={max_quantity}
              />
            ))}
        </div>
      </div>
    );
}