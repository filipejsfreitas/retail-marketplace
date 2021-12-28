import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"

export default function Home() {
  return (
    <Layout sidebar={ADMIN_SIDEBAR}>
      <h3>Administration Menu</h3>
    </Layout>
  )
}