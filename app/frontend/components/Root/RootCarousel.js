import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "styles/Root/root.module.css"
import { computeStars } from "components/Product/Produc";
import { Row, Col } from "react-bootstrap";

const  RootCarousel = (props) =>{
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: props.number,
          slidesToSlide: 1
        }
      };
      
    return (
        <Carousel
        draggable={false}
        showDots={false}
        infinite={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        partialVisible={false}
        >

        {props.props.map((key, elem) =>(
            <div key={elem} className={styles.root}>
              <div className={styles.recommended}>
              <img
                className={styles.recommendedPhoto}              
                src={key.photo}
              />
              </div >
              <div className={styles.textProd}>
                <div className={styles.product_name}>{key.name}</div>
                <Row>
                    <Col className={styles.product_stars}> {computeStars(key.stars)} </Col>  
                    <Col className={styles.product_price}>{key.price}€</Col>
                </Row>
              </div>
            </div>  
        ))}
        

        </Carousel>
    )
    
};

export default RootCarousel;