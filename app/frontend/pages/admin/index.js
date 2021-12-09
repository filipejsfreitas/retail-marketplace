import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import Menu from "components/Management/Menu"

export default function Home() {
  return (
    <Layout sidebar={ADMIN_SIDEBAR}>
      <Menu/>
    </Layout>
  )
}