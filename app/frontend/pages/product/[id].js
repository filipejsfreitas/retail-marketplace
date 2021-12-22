import React from "react"
import Layout from "../../components/Layout"
import Product from "../../components/Product/Product"
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import fetchProducts from "helper/fetchProduct";
import Error from "next/error";

export const getStaticPaths = async () => {
  
  const data = await fetchProducts();

  const paths = data.map((post) => ({
    params: { id: post._id },
  }))

  return { paths, fallback: 'blocking' }
}

/*const product = {
  name : "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
  photo: ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/8/8/8899.jpg",
      "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_p033017.jpg",
      "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/2/_/2_p033017.jpg",
      "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/4/_/4_p033017.jpg",
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
  ],
  stars: 3.5,
  price: 45.69,
  nreviews: 500,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
               tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
               s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
               Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
               tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
               eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
               n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
               c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
               finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
               neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
               d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.',
  seller: "Jorge Programador",
  characteristic:[
      {"name":"Color" , "value": "Black"} ,
      {"name":"Size"  , "value": "200cm"} ,
      {"name":"Weigth", "value": "40 kg"} ,
      {"name":"Cenas" , "value": "Nice2"} ,
      {"name":"Cenas2", "value": "Nice"}
  ],

  tecnical:[
      "Operador: Livre",
      "Dual SIM: Sim, Dual SIM (Nano-SIM, dual stand-by)",
      "Rede: 4G LTE",
      "Sistema Operativo: Android 11",
      "Chipset: Qualcomm Snapdragon 860 (7 nm)",
      "Processador: Octa-core (1x2.96 GHz Kryo 485 Gold & 3x2.42 GHz Kryo 485 Gold & 4x1.78 GHz Kryo 485 Silver)",
      "Gráficos: Adreno 640",
      "Armazenamento: 256GB (espaço utilizável será inferior) - expansível via microSD (utilizando um dos slots SIM)",
      "Memória RAM: 8GB",
      "Sensores: Impressão digital (montado na lateral), acelerômetro, giroscópio, proximidade, bússola",
      "Câmara Frontal: 20 MP, f/2.2, (wide), 1/3.4, 0.8µm",
      "Dimensões: 165.3 x 76.8 x 9.4 mm",
      "Peso: 215 g"
  ],

  reviews: [
      {
      title: "Very nice product",
      username: "Jorge Programador",
      stars: 4.5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
      tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
      s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
      Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
      tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
      eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
      n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
      c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
      finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
      neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
      d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.'
      },
      {
      title: "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
      username: "Jorge Programador",
      stars: 1.5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
      tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
      s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
      Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
      tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
      eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
      n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
      c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
      finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
      neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
      d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.'
      },
      {
      title: "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
      username: "Jorge Programador",
      stars: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
      tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
      s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
      Donec nec consequat ex.'
      }
  ]
}*/
export default function ProductPage({categories,product}){

  if( !categories || !product )
    return (<Error statusCode={503} />)

  return ( 
      <Layout categories={categories} >
          <Product props={product}></Product>
      </Layout>
  )
}

export async function getStaticProps(context) {

  const id = context.params.id;
  const res = await fetch(`${process.env.HOST}/product/${id}`)
  const data = await res.json()
  const product = data.data

  const categories = await fetchCategories();
  const revTime = revalidateTime()

  return {
    props: {
      categories,
      product
    },

    revalidate: revTime, 
  }
}



// This function gets called at build time on server-side.
// Next.js will attempt to re-generate the page:
// - When a request comes in
// - At most once every X seconds, X being the value in the 
// revalidate const.
// In development (npm run dev) this function is called on every 
// request