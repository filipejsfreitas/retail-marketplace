import React from "react"
import Layout from "../../components/Layout"
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import Info from "components/InfoSeller/Info";
import Proposals from "components/InfoSeller/Proposals";

export async function getStaticPaths(){

  const data = [];

  const paths = data.map((post) => ({
    params: { id: post._id },
  }))

  return { paths, fallback: 'blocking' }
}


export default function SellerPage({categories}){

  return ( 
      <Layout categories={categories} >
          <Info></Info>
          <Proposals></Proposals>
      </Layout>
  )
}

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
