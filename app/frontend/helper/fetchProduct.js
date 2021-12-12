export default async function fetchProducts() {

    const product = await fetch(`${process.env.HOST}/product/61b3e59643d4336ac0a7a809`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
    return product
}