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


export async function fetchCategoriePath(id) {
    let categories = []
    let hasParent = true
    let current = id
    let maxSteps = 4

    while( hasParent && maxSteps > 0 ){
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/category/${current}`)
            .then( (res) => {
                return res.json()
            })
            .then( ({data}) => {
                categories.push(data.name)
                current = data.parent_id
                if(!data.parent_id){
                    hasParent = false
                }
            } )
        maxSteps--
    }

    return categories

}

export async function setFavoriteOn(id) {

    await fetch(`${process.env.NEXT_PUBLIC_HOST}/client/favorites`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id})
    }).catch((error) => console.log(error)) 
    
    return 1
}

export async function setFavoriteOff(id) {

    await fetch(`${process.env.NEXT_PUBLIC_HOST}/client/favorites/${id}`, {
        method: 'DELETE',
    }).catch((error) => console.log(error))
    
    return 1
}

export async function fetchProposalsClient(id) {

    const proposals = await fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/seller/{${id}`)
        .then( (res) => res.json() )
        .then( (data) => data.data )
        .catch( () => false )
    return proposals
}
