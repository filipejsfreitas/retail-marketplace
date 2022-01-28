import styles from "styles/Checkout/Content/Basket/Basket.module.css"
import Item from "./Item";

export default function Basket({quantity,basket}) {

    return (
      <div className={styles.box}>
        <div className={styles.title}>
          Basket <span className={styles.titleProdN}>({`${quantity}`} products)</span>
        </div>
        <div className={styles.items}>
          {basket[0].map(({ _id, image, name, price, quantity, seller, category, stock, max_quantity }) => (
              <Item
                basket={basket}
                key={_id}
                id={_id}
                img={image}
                title={name}
                price={price}
                quantity={quantity}
                seller={seller}
                category={category}
                stock={stock}
                max_quantity={max_quantity}
              />
            ))}
        </div>
      </div>
    );
}