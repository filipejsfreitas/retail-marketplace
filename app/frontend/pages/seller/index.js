import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "styles/Seller/index.module.css"

function DefaultCarousel({children, ...props}) {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 }
  }
  return <Carousel
    draggable={false}
    infinite={true}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    centerMode={true}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={4000}
    keyBoardControl={true}
    customTransition="all .5"
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    dotListClass="custom-dot-list-style"
    partialVisible={false}
    {...props}
  >
    {children}
  </Carousel>
}

function RecommendedCategories({ recommendedCategories }) {
  return <div>
    <h5>Recommended Categories</h5>
    <div className={styles.panel_cat}>
    <DefaultCarousel>
      {
        recommendedCategories.categories.map(cat => (
          <div key={cat} className={styles.carr_cat_elem}>
            {cat}
          </div>
        ))}
      </DefaultCarousel>
  </div>
  </div>
}

export default function Home() {
  const { fetchAuth: fetch } = useFetchAuth()
  const { isReady } = useRouter()
  const [panel, setPanel] = useState(undefined)
  console.debug(panel)

  useEffect(() => {
    if (!isReady) return
    fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel`)
      .then(rep => rep.json())
      .then(p => setPanel(p))
  }, [isReady])
  //console.debug(panel)

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={panel === undefined}>
    {panel && <>
      <RecommendedCategories recommendedCategories={panel.recommendedCategories} />
    </>}
  </Layout>
}