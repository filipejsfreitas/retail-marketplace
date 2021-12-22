export default async function fetchProducts() {

    const products = await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/list`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
                            .catch( () => false )
    return products
}

export async function fetchProposals(id) {

    const proposals = await fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/product/${id}`)
        .then( (res) => res.json() )
        .then( (data) => data.data )
        .catch( () => false )
    return proposals
}

export async function fetchProduct(id) {

    const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${id}`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
                            .catch( () => false )
    return product
}
