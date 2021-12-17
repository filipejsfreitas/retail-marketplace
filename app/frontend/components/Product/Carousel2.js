import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "styles/Root/root.module.css"
import Link from "next/link"
import { Row, Col } from "react-bootstrap";
import { computeStars } from "components/Product/Product";



const  RecomendedProducts = (props) => {

    const imagesrc = "http://localhost:3001/"
    const defImg = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };

    return (
        <Carousel
        draggable={false}
        showDots={true}
        infinite={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
        
        {
        props.props.map((key, elem) =>(
            <div key={elem} className={styles.root}>
              <div className={styles.recommended}>
              {/*Adicionar imagesrc*/}
              <img
                className={styles.recommendedPhoto}              
                src={key.images.length!=0 ? key.images[0] : defImg}
              />
              </div >
              <div className={styles.textProd}>
                {/* Trocar name para id no LINK*/}
                <div className={styles.product_name}><Link href={`/product/${key._id}`}>{`${key.name}`}</Link></div>
                <Row>
                    <Col className={styles.product_stars}> {computeStars(key.score)} </Col>  
                    <Col className={styles.product_price}>{key.price}€</Col>
                </Row>
              </div>
            </div>  
        ))}
        

        </Carousel>
    )
    
};

export default RecomendedProducts;