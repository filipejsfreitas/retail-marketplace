import React from "react"
import Layout from "../components/Layout"
import Product from "../components/Product/Produc"
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import fetchProduct from "helper/fetchProduct";


export default function ProductPage({ categories, product }){

    return ( 
        
        <Layout categories={categories} >
            <Product props={product}></Product>
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
    const product = await fetchProduct();

    return {
      props: {
        categories,
        product
      },
  
      revalidate: revTime, 
    }
  }
