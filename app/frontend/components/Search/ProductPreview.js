import { Container } from "react-bootstrap"
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Link from 'next/link'

import styles from "styles/Search/product_preview.module.css"

function computeStars(stars) {
    var r = []
    for (var i = 0; i < 5; i++, stars--) {
        if (stars <= 0) r[i] = <BsStar key={"star-" + i} />
        else if (stars <= 0.5) r[i] = <BsStarHalf key={"star-" + i} />
        else r[i] = <BsFillStarFill key={"star-" + i} />
    }
    return <>
        {r}
    </>
}

export default function ProductPreview({ product }) {
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    const { _id, name, images, score } = product ?? {
        _id: "",
        name: "A very nice and big product name",
        images: [],
        score: 3.5,
    }

    return <Container className={styles.frame}>
        <Link href={`/product/${_id}`}>
            <a className={styles.link}>
                <img className={styles.img} src={(images[0] && `${process.env.NEXT_PUBLIC_HOST}/${images[0]}`) || fallback}
                    alt="Product Photo" />
                <h6 className={styles.product_name}> {name} </h6>
                <Container className={styles.product_name}>{computeStars(score)}</Container>
            </a>
        </Link>
    </Container>
}