import Layout from "components/Layout";
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import ProductPreview from "components/Search/ProductPreview"
import styles from "styles/Categories/categories.module.css"
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from "next/router";
import { BsArrowRightCircle} from "react-icons/bs";
import Link from "next/link";
import Error from "next/error";
import useFetchData from "hooks/useFetchData"

export const getStaticPaths = async () => {
    
    let categories = await fetchCategories();

    if ( !categories )
      categories = []
    
    const path = []
    {categories.map(({ name, children }) => 
      {
      const father = name;
      path.push({params: { categorie: [`${name}`] }})
        {children.map(({ name , children}) => {
          const father2 = name;
          path.push({params: { categorie: [`${father}`, `${name}`] }})
          {children.map(({ name }) => {
            path.push({params: { categorie: [`${father}`,`${father2}`, `${name}`] }})
            })}
        })}
      }
    )}
    const paths =  path
    return {
      paths,
      fallback: false
    }
}

const GetProductsCategory = ({products}) =>{
  return products.map(product => <ProductPreview product={product} />)
}

export default function Categories({categories}){
  const router = useRouter()
  const title = router.asPath
  var cats = title.split('/')
  cats.shift()

  if ( !categories )
    return <Error statusCode={503} ></Error>
  
  const catToFetch = cats[cats.length -1] 

  const { data: products, loading } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/category/${catToFetch}`, {when : catToFetch})
  
  return ( 
    
    <Layout categories={categories}>
      <Row md={12}>
        <div className={styles.title}> 
          <Link href="/">Home</Link>
              {cats.map((cat, i) => {
                const url = cats.slice(0, i+1).reduce((acc, cat) => acc.concat("/").concat(cat), "")
                return (
                  <span key={i}>
                    <BsArrowRightCircle className={styles.arrow}/>                    
                      <Link href={url}>
                        {cat}
                      </Link>
                  </span>
                )
                }
              )}
        </div>
      </Row>
      {loading ? <></> :
      <Row md={12}>
          <Container className={styles.frame}>
            <GetProductsCategory products={products}  key={catToFetch}/>
          </Container>
      </Row>
      }
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