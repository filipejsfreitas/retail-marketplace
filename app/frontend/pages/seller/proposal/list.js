import { useState, useEffect } from "react"
import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import ToggleDropdown from "components/Management/ToggleDropdown"
import useFetchData from "hooks/useFetchData"

function ProposalProductName(props){
    const [[product, isLoading], _] =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${props.proposal.product_id}`, {})
    return <h5>{isLoading ? "(Loading product name...)" : product.name}</h5>
}

export default function ProposalList() {
    const sellerId = "123456"
    const [[proposals, isLoading], _] =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/proposal/seller/${sellerId}`, [])

    return <Layout sidebar={SELLER_SIDEBAR} isLoading={isLoading}>
        <h3>Manage Proposals</h3>
        <br />
        <ToggleDropdown title={<h4>Proposal List</h4>}>
            {proposals.map(proposal => <ProposalProductName key={proposal._id} proposal={proposal}>
                {proposal._id}
            </ProposalProductName>
            )}
        </ToggleDropdown>
    </Layout>
}