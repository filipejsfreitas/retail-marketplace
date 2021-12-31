import { Row , Button, ListGroupItem} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'
import { computeStars } from "components/Product/Product";
import Status from "components/common/Status";
import Link from "next/link";

const Proposal = ({prod, prop}) =>{ 
   
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"

    return(
    <>
        <ListGroupItem>
            <Row>
                <div className={styles.list}>
                    <div className={styles.itemImg}>
                        <img
                          className={styles.imgDiv}              
                          src={(prod.images[0] && `${process.env.NEXT_PUBLIC_HOST}/${prod.images[0]}`) || fallback}
                        />
                    </div >
                    <div className={styles.itemInfoWrapper}>
                        <div className={styles.itemInfo}>
                            <div className={styles.title}><Link href={`/product/${prod._id}`}>{prod.name}</Link></div>
                            {/*<div className={styles.categorie}>Categoria</div>*/}
                            <div className={styles.stars}>{computeStars(prod.score)}</div>
                            <span className={styles.status}><Status stock={prop.stock}/></span>
                        </div>
                        <div className={styles.priceWrapper}>
                            <div className={styles.price}>
                                {prop.price}€
                            </div>
                            <div className={styles.price}>
                                <Button type="submit" variant="secundary"  className={styles.button}
                                 disabled={(prop.stock <= 0 ? true: false)}>
                                    ADD TO CARD
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </ListGroupItem>
    </>
    )
}

export default Proposal;