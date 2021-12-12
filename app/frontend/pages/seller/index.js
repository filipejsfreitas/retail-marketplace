import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"

export default function Home() {
  return (
    <Layout sidebar={SELLER_SIDEBAR}>
      seller content
    </Layout>
  )
}