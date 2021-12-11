import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"

export default function Home() {
  return (
    <Layout sidebar={ADMIN_SIDEBAR}>
      admin content
    </Layout>
  )
}