import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Col, Table } from "react-bootstrap"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ResponsivePie from 'components/Seller/ResponsivePie'
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from '@nivo/calendar'
import Link from "next/link"
import SellerCard from "components/Seller/Card"

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
  return <SellerCard className={styles.panel_recommended_categories}
    title={"Recommended Categories"}>
    <div className={styles.recommended_categories_table_wrapper}>
      <Table striped hover responsive>
        <thead>
          <tr> <th>CATEGORY</th> </tr>
        </thead>
        <tbody>
          {recommendedCategories.categories.map(cat => (
            <tr key={cat}> <td> {cat} </td> </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </SellerCard>
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
  return <SellerCard className={styles.panel_orders} title={"Orders State"}>
    <ResponsivePie data={data} />
  </SellerCard>
}


function RevenueOverviewBar({ revenueOverview }) {
  const data = revenueOverview.slice(-15).map(({ _id, count }) => ({
    date: new Date(_id.year, _id.month, _id.day).toLocaleDateString('en-GB'),
    revenue: count,
  }))

  return <SellerCard className={styles.panel_revenue} title={"Daily Sales"}>
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
  </SellerCard>
}


function RevenueOverviewCal({ revenueOverview }) {
  const data = revenueOverview.map(({ _id, count }) => ({
    value: count,
    day: new Date(_id.year, _id.month, _id.day).toJSON().slice(0, 10),
  }))
  const curr = new Date()

  return <SellerCard className={styles.panel_revenue_cal} title={"Yearly Sales Overview"}>
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
  </SellerCard>
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
      <RevenueOverviewBar revenueOverview={panel.revenueOverview} />
      <RevenueOverviewCal revenueOverview={panel.revenueOverview} />
      <OrdersPie ordersOverview={panel.ordersOverview} />
      <RecommendedCategories recommendedCategories={panel.recommendedCategories} />
      <LowStockProposals lowStockProposals={panel.alerts.lowStockProposals} />
    </div>}
  </Layout>
}