import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ResponsivePie } from '@nivo/pie'

import styles from "styles/Seller/index.module.css"

function DefaultCarousel({ children, ...props }) {
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

function OrdersPie({ ordersOverview }) {
  const data = [
    { "id": "processing", "label": "Processing", "value": ordersOverview.processing },
    { "id": "sent", "label": "Processing", "value": ordersOverview.sent + 1 },
  ]
  return <div style={{ height: 300 }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  </div >
}

export default function Home() {
  const { fetchAuth: fetch } = useFetchAuth()
  const { isReady } = useRouter()
  const [panel, setPanel] = useState(undefined)

  useEffect(() => {
    if (!isReady) return
    fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel`)
      .then(rep => rep.json())
      .then(p => setPanel(p))
  }, [isReady])

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={panel === undefined}>
    {panel && <>
      {/*<RecommendedCategories recommendedCategories={panel.recommendedCategories} />*/}
      <OrdersPie data={data} ordersOverview={panel.ordersOverview} />
    </>}
  </Layout>
}