import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import Link from "next/link"

import styles from "styles/Checkout/Content/Basket/Item/Seller.module.css"


function computeStars(stars) {
  var r = [];
  for (var i = 0; i < 5; i++, stars--) {
    if (stars <= 0) r[i] = <BsStar key={"star-" + i} />;
    else if (stars <= 0.5) r[i] = <BsStarHalf key={"star-" + i} />;
    else r[i] = <BsFillStarFill key={"star-" + i} />;
  }
  return <div className={styles.stars}>{r}</div>;
}



export default function Seller({id,name,rating}) {
    return (
        <div className={styles.seller}>
            <Link href={`/infoseller/${id}`}>
                {`${name}`}
            </Link>
            <Link href={`/infoseller/${id}`}>
                {computeStars(rating)}
            </Link>
        </div>
    )
}