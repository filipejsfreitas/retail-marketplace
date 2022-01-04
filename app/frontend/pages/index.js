import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import RootCarousel from "components/Root/RootCarousel";
import { Row, Col } from "react-bootstrap";
import styles from '../styles/Root/root.module.css'
import Layout from "components/Layout";
import fetchProducts from "helper/ProductPageHelper";
import useProductList from "hooks/useProductList"
import Error from "next/error";
import Search from "components/Search/index"
import { useRouter } from "next/router";

function HomeContent({ products }) {
  return <>
    <h2 className={styles.titles} >Trending</h2>
    <RootCarousel props={products} number={6} />
    <Row md={12} className={styles.row}>
      <Col md={6} className={styles.col1}>
        <h2 className={styles.titles} >New</h2>
        <RootCarousel props={products} number={3} />
      </Col>
      <Col md={6} className={styles.col2}>
        <h2 className={styles.titles}>On Sale</h2>
        <RootCarousel props={products} number={3} />
      </Col>
    </Row>
    <h2 className={styles.titles}>Best Sellers</h2>
    <RootCarousel props={products} number={6} />
  </>
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
