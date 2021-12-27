import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "styles/Root/root.module.css"
import { computeStars } from "components/Product/Product";
import { Row, Col } from "react-bootstrap";
import Link from "next/link"

const  RootCarousel = (props) =>{
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: props.number,
          slidesToSlide: 1
        }
      };
    
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"

    return (
        <Carousel
        draggable={false}
        showDots={false}
        infinite={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        partialVisible={false}
        >
        
        {
        props.props.map((key, elem) =>(
            <div key={elem} className={styles.root}>
              <Link className={styles.title} href={`/product/${key._id}`}>
              <a className={styles.title}>  
                <div className={styles.recommended}>
                <img
                  className={styles.recommendedPhoto}              
                  src={(key.images[0] && `${process.env.NEXT_PUBLIC_HOST}/${key.images[0]}`) || fallback}
                />
                </div>
                <div className={styles.textProd}>
                  <div className={styles.product_name}>{`${key.name}`}</div>
                  <Row>
                      <Col className={styles.product_stars}> {computeStars(key.score)} </Col>  
                      <Col className={styles.product_price}>{key.best_offer}€</Col>
                  </Row>
                </div>
              </a>
              </Link>
            </div> 
        ))}
        

        </Carousel>
    )
    
};

export default RootCarousel;