import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from '@nivo/calendar'
import Link from "next/link"

import styles from "styles/Seller/index.module.css"
import useFetchData from "hooks/useFetchData"

function DefaultCarousel({ children, ...props }) {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 }
  }
  return <Carousel
    draggable={false}
    showDots={true}
    infinite={true}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    centerMode={true}
    infinite={true}
    autoPlay={false}
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
  return <div className={styles.panel}>
    <h5>Recommended Categories</h5>
    <div className={styles.panel_cat}>
      <DefaultCarousel autoPlay={true}>
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

function LowStockProposal({ proposal }) {
  const { _id, stock, product_id } = proposal
  const { data: product, loading } =
    useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${product_id}`)
  return <div key={_id} className={styles.carr_lowstock_elem}>
    <Col>
      <h6>Product</h6>
      <Link href={`/seller/proposal/${_id}`}>
        <a>
          {product ? product.name : "Loading..."}
        </a>
      </Link>
    </Col>
    <Col>
      <h6>Stock</h6>
      {stock}
    </Col>
  </div>
}

function LowStockProposals({ lowStockProposals }) {
  return <div className={styles.panel}>
    <h5>Low Stock Proposals</h5>
    <div className={styles.panel_lowstock}>
      <DefaultCarousel>
        {lowStockProposals.map(proposal =>
          <LowStockProposal key={proposal._id} proposal={proposal} />)}
      </DefaultCarousel>
    </div>
  </div>
}

function OrdersPie({ ordersOverview }) {
  const data = [
    { "id": "processing", "label": "Processing", "value": ordersOverview.processing },
    { "id": "sent", "label": "Processing", "value": ordersOverview.sent },
  ]
  return <div className={styles.panel}>
    <h5>Orders State</h5>
    <div className={styles.panel_orders}>
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
  </div>
}


function RevenueOverviewBar({ revenueOverview }) {
  const data = revenueOverview.slice(-15).map(({ _id, count }) => ({
    date: new Date(_id.year, _id.month, _id.day).toLocaleDateString('en-GB'),
    revenue: count,
  }))

  return <div className={styles.panel}>
    <h5>Revenue Overview</h5>
    <div className={styles.panel_revenue}>
      <ResponsiveBar
        data={data}
        keys={["revenue"]}
        indexBy="date" 
        margin={{ top: 25, right: 25, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        label={d => `${d.value}€`}
      />
    </div>
  </div>
}


function RevenueOverviewCal({ revenueOverview }) {
  const data = revenueOverview.map(({ _id, count }) => ({
    value: count,
    day: new Date(_id.year, _id.month, _id.day).toJSON().slice(0,10),
  }))

  const curr = new Date()

  return <div className={styles.panel}>
    <h5>Revenue Overview Calendar</h5>
    <div className={styles.panel_revenue_cal}>
      <ResponsiveCalendar
        data={data}
        from={`${curr.getFullYear()}`}
        to={`${curr.getFullYear()}`}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  </div>
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
  console.debug(panel)

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={panel === undefined}>
    <h3>Home</h3>
    {panel && <div className={styles.content}>
      <RecommendedCategories recommendedCategories={panel.recommendedCategories} />
      <OrdersPie ordersOverview={panel.ordersOverview} />
      <RevenueOverviewBar revenueOverview={panel.revenueOverview} />
      <LowStockProposals lowStockProposals={panel.alerts.lowStockProposals}/>
      <RevenueOverviewCal revenueOverview={panel.revenueOverview} />
    </div>}
  </Layout>
}