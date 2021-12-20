export default async function fetchProducts() {

    const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/list`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
                            .catch( () => false )
    return product
}