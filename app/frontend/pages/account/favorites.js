import Layout from "components/Layout"
import ProductPreview from "components/Search/ProductPreview"
import useFetchData from "hooks/useFetchData"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

import rootstyles from 'styles/Root/root.module.css'
import styles from "styles/favorites.module.css"


const Favorite = ({favorite}) => {
    const { data: product } =
          useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${favorite}`)
    return <ProductPreview product={product} />
}

const GetFavorites = ({favorites}) =>{
    return favorites.map(favorite => <Favorite favorite={favorite}/>)
}

export default function Favorites({ categories }) {
    const { data: client, loading } =
         useFetchData(`${process.env.NEXT_PUBLIC_HOST}/client`, { default: {} })
    return <Layout categories={categories} >
        <h2 className={rootstyles.titles}>Favorites</h2>

        {loading ? <></> : 
            <div className={styles.frame}>
                <GetFavorites favorites={client.favoriteProducts}/>
            </div>
        }
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