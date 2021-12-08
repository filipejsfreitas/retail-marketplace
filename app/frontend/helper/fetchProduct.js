
export default async function fetchProducts() {

    const product = await fetch(`${process.env.HOST}/product/61afaee1ddb0e41ebe75e6a6`)
                            .then( (res) => res.json() )
                            .then( (data) => data.data )
    return product
    }