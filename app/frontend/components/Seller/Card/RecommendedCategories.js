import { Table } from "react-bootstrap"
import SellerCard from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"

export default function RecommendedCategories({ recommendedCategories }) {
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