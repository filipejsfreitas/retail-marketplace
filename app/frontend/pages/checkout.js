import Layout from "components/Layout"
import Checkout from "components/Checkout/Checkout";
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import { Container } from "react-bootstrap";

import styles from 'styles/checkout.module.css'

export default function Home({ categories }) {
    const selected = 1
  return (
    <Layout categories={categories}>
        <div className={`bg-primary ${styles.titleBackground}`}></div>
        <Container className={`${styles.titleContainer}`}>Checkout</Container>
        <Checkout/>
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

  return {
    props: {
      categories,
    },

    revalidate: revTime, 
  }
}
