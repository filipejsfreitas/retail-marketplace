import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

export default function Home({ categories }) {
  return (
    <></>
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
