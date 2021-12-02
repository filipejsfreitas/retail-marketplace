import React from "react";
import { Carousel, Row ,Col} from 'react-bootstrap';

function RecomendedProducts() {
    const photo="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";

    return (
        <div>
            <div className='container-fluid' >
                <div className="row">
                <div className="col-12">
                <Carousel >
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <img
                                className="d-block w-100"    
                                src={photo}
                                />
                            </Col>
                            <Col>
                                <img
                                className="d-block w-100"
                                src={photo}
                                />
                            </Col>
                            <Col>
                                <img
                                className="d-block w-100"
                                src={photo}
                                />
                            </Col>
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <img
                                className="d-block w-100"
                                src={photo}
                                />
                            </Col>
                            <Col>
                                <img
                                className="d-block w-100"
                                src={photo}
                                />
                            </Col>
                            <Col>
                                <img
                                className="d-block w-100"
                                src={photo}
                                />
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                </div>
                </div>
            </div>
        </div>
    )
};

export default RecomendedProducts;