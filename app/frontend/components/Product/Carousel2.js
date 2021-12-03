import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function RecomendedProducts() {
    const photo1 = ["https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"]

    //const photo = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"

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
        
        {photo1.map((key, elem) =>(
            <div key={elem}>
            <img
            className="d-block w-100"
            src={key}
            />
            </div>
        ))}
        

        </Carousel>
    )
    
};

export default RecomendedProducts;
//        <div>
//            <div className='container-fluid' >
//                <Carousel >
//                    <Carousel.Item>
//                        <Row>
//                            <Col>
//                                <img
//                                className="d-block w-100"    
//                                src={photo}
//                                />
//                            </Col>
//                            <Col>
//                                <img
//                                className="d-block w-100"
//                                src={photo}
//                                />
//                            </Col>
//                            <Col>
//                                <img
//                                className="d-block w-100"
//                                src={photo}
//                                />
//                            </Col>
//                        </Row>
//                    </Carousel.Item>
//                </Carousel>
//            </div>
//        </div>
