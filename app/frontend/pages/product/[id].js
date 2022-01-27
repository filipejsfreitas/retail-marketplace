import React from "react"
import Layout from "../../components/Layout"
import Product from "../../components/Product/Product"
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import fetchProducts, { fetchProposals, fetchProduct, fetchCategoriesAbove } from "helper/ProductPageHelper";
import Error from "next/error";
import useFetchData from "hooks/useFetchData";
import useToken from "hooks/useToken";
import { UserType } from "hooks/useToken";
import { Spinner } from "react-bootstrap";
import TokenContext from 'components/Context/TokenContext'
import useFetchAuth from 'hooks/useFetchAuth'
import { useContext, useState } from "react";

export const getStaticPaths = async () => {
  
  const data = await fetchProducts();

  const paths = data.map((post) => ({
    params: { id: post._id },
  }))

  return { paths, fallback: 'blocking' }
}

export default function ProductPage({categories,product, proposals}){
  const { userType } = useContext(TokenContext)
  if( !categories || !product )
    return (<Error statusCode={503} />)
 
  const { data: cats, loading: loading} = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/category/above/${product.category_id}`)
  const { data: favs, loading: loading2 } = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/client`, { when: (userType === UserType.CLIENT) })
  const { data: recommended, loading: loading3 } = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/sugestions/${product._id}`, { when: (userType === UserType.CLIENT) })

  return ( 
      <Layout categories={categories} >
        {loading || (userType === UserType.CLIENT && loading2) || (userType === UserType.CLIENT && loading3) ? 
          <div  style={{ "display": "flex", "justifyContent": "center" }}>
          <Spinner animation="border" />
          </div>  :
          <Product prod={product} proposals={proposals} cats={cats} favs={favs} recommended={recommended}></Product>
        }
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


export async function getStaticProps(context) {
 
  const id = context.params.id;
  const product = await fetchProduct(id);
  const proposals = await fetchProposals(id);
  const categories = await fetchCategories();
  

  const revTime = revalidateTime()
  return {
    props: {
      categories,
      proposals,
      product,
    },

    revalidate: revTime, 
  }
}