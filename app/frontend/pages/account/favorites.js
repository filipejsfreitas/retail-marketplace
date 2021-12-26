import Layout from "components/Layout"
import ProductPreview from "components/Search/ProductPreview"
import useFetchData from "hooks/useFetchData"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

import rootstyles from '../styles/Root/root.module.css'
import styles from "styles/favorites.module.css"

export default function Favorites({ categories }) {
    const { data: products } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/list`, { default: [] })
    console.log(products)
    return <Layout categories={categories} >
        <h2 className={rootstyles.titles}>Favorites</h2>
        <div className={styles.frame}>
            {products.map(product => <ProductPreview key={product._id} product={product} />)}
        </div>
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

    return {
        props: {
            categories,
        },

        revalidate: revTime,
    }
}