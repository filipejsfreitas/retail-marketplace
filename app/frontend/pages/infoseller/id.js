import React from "react"
import Layout from "../../components/Layout"
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import Info from "components/InfoSeller/Info";
import Proposals from "components/InfoSeller/Proposals";

export default function ProductPage({categories}){

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
