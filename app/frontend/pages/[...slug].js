import Layout from "components/Layout";
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import ProductPreview from "components/Search/ProductPreview"
import styles from "styles/Categories/categories.module.css"
import { Container, Row, Col } from "react-bootstrap"
import { useRouter } from "next/router";
import { BsArrowRightCircle} from "react-icons/bs";
import Link from "next/link";

export const getStaticPaths = async () => {
    
    const categories = await fetchCategories();
    
    const path = []
    {categories.map(({ name, children }) => 
      {
      const father = name;
      path.push({params: { slug: [`${name}`] }})
        {children.map(({ name , children}) => {
          const father2 = name;
          path.push({params: { slug: [`${father}`, `${name}`] }})
          {children.map(({ name }) => {
            path.push({params: { slug: [`${father}`,`${father2}`, `${name}`] }})
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
  

export default function Categories({categories}){
  const router = useRouter()
  const title = router.asPath
  var cats = title.split('/')
  cats.shift()

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
            
      <Row md={12}>
          <Container className={styles.frame}>
              <ProductPreview />
              <ProductPreview />
              <ProductPreview />
              <ProductPreview />
              <ProductPreview />
              <ProductPreview />
          </Container>
      </Row>
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