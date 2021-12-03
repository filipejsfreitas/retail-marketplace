import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "styles/Product/product.module.css"

function RecomendedProducts(props) {

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
        
        {props.props.map((key, elem) =>(
            <div key={elem} align="center">
              <div className={styles.recommended}>
              <img
                className={styles.recommendedPhoto}              
                src={key.photo}
              />
              </div >
              <div className={styles.textProd}>
                <div className={styles.product_name}>{key.name}</div>
                <div className={styles.product_name} >{key.price}€</div>
              </div>
            </div>
        ))}
        

        </Carousel>
    )
    
};

export default RecomendedProducts;