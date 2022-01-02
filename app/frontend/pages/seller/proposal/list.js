import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import useFetchData from "hooks/useFetchData";
import Link from "next/link";
import gstyles from "/styles/Seller/globals.module.css";

function ProposalProductName(props) {
  const { data: product, loading: loading } = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}/product/${props.proposal.productId}`
  );
  return (
    <Link href={`/seller/proposal/${props.proposal._id}`}>
      <a className={gstyles.link}>
        <h5>{loading ? "(Loading product name...)" : product.name}</h5>
      </a>
    </Link>
  );
}

export default function ProposalList() {
  const sellerId = "123456";
  const { data: proposals, loading: loading } = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}/proposal/seller/${sellerId}`,
    { default: [] }
  );

  return (
    <Layout sidebar={SELLER_SIDEBAR} isLoading={loading}>
      <h3>Manage Proposals</h3>
      <br />
      <ToggleDropdown title={<h4>Proposal List</h4>}>
        {proposals.map((proposal) => (
          <ProposalProductName key={proposal._id} proposal={proposal}>
            {proposal._id}
          </ProposalProductName>
        ))}
      </ToggleDropdown>
    </Layout>
  );
}
