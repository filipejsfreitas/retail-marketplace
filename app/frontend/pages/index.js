import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import RootCarousel from "components/Root/RootCarousel";
import { Row, Col } from "react-bootstrap";
import styles from '../styles/Root/root.module.css'
import Layout from "components/Layout";
import fetchProducts from "helper/ProductPageHelper";
import useProductList from "hooks/useProductList"
import Error from "next/error";
import Search from "components/Search/index"
import { computeStars } from "components/Product/Product";
import { useRouter } from "next/router";
import Link from "next/link";

function Product({ product }) {
  const { _id, images, name, score, best_offer } = product
  return <div className={styles.root}>
    <Link className={styles.title} href={`/product/${_id}`}>
      <a className={styles.title}>
        <div className={styles.recommended}>
          <img
            className={styles.recommendedPhoto}
            src={(images[0] && `${process.env.NEXT_PUBLIC_HOST}/${images[0]}`) || fallback}
          />
        </div>
        <div className={styles.textProd}>
          <div className={styles.product_name}>{`${name}`}</div>
          <Row>
            <Col className={styles.product_stars}> {computeStars(score)} </Col>
            <Col className={styles.product_price}>{best_offer}€</Col>
          </Row>
        </div>
      </a>
    </Link>
  </div>
}

function HomeContent({ products }) {
  return <div className={styles.frame}>
    {products.map(product => <Product key={product._id} product={product}/>)}
  </div>
}

export default function Home({ categories, products }) {

  if( !categories || !products )
    return (<Error statusCode={503} />)
  
  const router = useRouter()
  const { products: prods, query, modifyQuery } =
    useProductList({ default: products, skipInit: true })

  const searching = router.query ? router.query.query : false

  return <Layout categories={categories}>
    {searching ? <Search products={prods} query={query} modifyQuery={modifyQuery} />
      : <HomeContent products={prods} />}
  </Layout>
}

// This function gets called at build time on server-side.
// Next.js will attempt to re-generate the page:
// - When a request comes in
// - At most once every X seconds, X being the value in the 
// revalidate const.
// In development (npm run dev) this function is called on every 
// request
export async function getStaticProps() {
  
  const categories = await fetchCategories();
  const revTime = revalidateTime()

  const products = await fetchProducts();
  
  return {
    props: {
      categories,
      products
    },

    revalidate: revTime, 
  }
}
