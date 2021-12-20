import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import RootCarousel from "components/Root/RootCarousel";
import { Row, Col } from "react-bootstrap";
import styles from '../styles/Root/root.module.css'
import Layout from "components/Layout";
import fetchProducts from "helper/fetchProduct";
import Error from "next/error";

export default function Home({ categories, products }) {

  
  //const newP1 = [
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/s/l/slb_2.jpg",
  //    name: "Very nice and sac s acasca s aca pruduct pruduct pruduct name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p006585-11615_21.jpg",
  //    name: "Very nice and long pruduct product name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/1/11_p025674.jpg",
  //    name: "Very nice and long name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  //    name: "Very nice and long pruduct name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/s/l/slb_2.jpg",
  //    name: "Very nice and long pruduct pruduct pruduct name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p006585-11615_21.jpg",
  //    name: "Very nice and long pruduct product name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/1/11_p025674.jpg",
  //    name: "Very nice and long name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  //    name: "Very nice and long pruduct name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/s/l/slb_2.jpg",
  //    name: "Very nice and long pruduct pruduct pruduct name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p006585-11615_21.jpg",
  //    name: "Very nice and long pruduct product name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/1/11_p025674.jpg",
  //    name: "Very nice and long name",
  //    price: "20",
  //    stars: 3
  //  },
  //  {
  //    photo:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  //    name: "Very nice and long pruduct name",
  //    price: "20",
  //    stars: 3
  //  }
  //]
  if( !categories || !products )
    return (<Error statusCode={503} />)

  return (
    <Layout categories={categories}>
      <h2 className={styles.titles} >Trending</h2>
      <RootCarousel props={products} number={6}/>
      <Row md={12} className={styles.row}>
        <Col md={6} className={styles.col1}>
          <h2  className={styles.titles} >New</h2>
          <RootCarousel props={products} number={3}/>
        </Col>
        <Col md={6} className={styles.col2}>
          <h2 className={styles.titles}>On Sale</h2>
          <RootCarousel props={products} number={3}/>
        </Col>
      </Row>
      <h2 className={styles.titles}>Best Sellers</h2>
      <RootCarousel props={products} number={6}/>
    </Layout>
  )
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
