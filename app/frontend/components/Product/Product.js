import { Container, ListGroup, Button, Table, Row, Col, ListGroupItem } from "react-bootstrap"
import React from "react"
import styles from 'styles/Product/product.module.css'
import RecomendedProducts from "./Carousel2"
import CarouselComponent from "./Carousel"
import { BsFillStarFill, BsStarHalf, BsStar, BsArrowRightCircle, BsHeart, BsHeartFill} from "react-icons/bs";
import Reviews from "./Review"
import MyModal from "./Comment"
import Proposals from "./Proposals"
import {useState} from "react";


export function computeStars(stars) {
    var r = []
    for(var i=0; i<5; i++, stars--){
        if(stars <= 0) r[i] = <BsStar key={"star-" + i}/>
        else if(stars <= 0.5) r[i] = <BsStarHalf key={"star-" + i}/>
        else r[i] = <BsFillStarFill key={"star-" + i}/>
    }
    return <>
        {r}
    </>
}

const Product = (props) => {
    
    const [modalShow, setModalShow] = React.useState(false);
    const recomended = [
        {
          images:["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/s/l/slb_2.jpg"],
          name: "Very nice and long pruduct pruduct pruduct name",
          price: "20",
          score: 2
        },
        {
          images:["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p006585-11615_21.jpg"],
          name: "Very nice and long pruduct product name",
          price: "20",
          score: 2
        },
        {
          images:["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/1/11_p025674.jpg"],
          name: "Very nice and long name",
          price: "20",
          score: 4
        },
        {
          images:[],
          name: "Very nice and long pruduct name",
          price: "40",
          score: 3
        }
      ]
    const [favBC, setfavBC] = useState("rgb(0, 0, 0)")
    const [fav, setfav] = useState(false)
    const appStyles={
      background:"#ffffff",
      border: 0,
      color:`${favBC}`,
      outline: 0,
      boxShadow:"0px 0px 0px 0px black"
    }
        
    const prod = props.props
    const proposals = props.proposals
    const commentsOrd = prod.comments.sort((a, b) =>  new Date(b.date) - new Date(a.date))
    return (            
           <>
            <Row md={12}>
                {/*Ver os argumentos da categoria que vem no pedido para completar*/}
                <div> Home<BsArrowRightCircle className={styles.arrow}/>
                      Tecnologia<BsArrowRightCircle className={styles.arrow}/>  
                      Smartphones<BsArrowRightCircle className={styles.arrow}/> 
                      {prod.name}
                </div>

                <Col md={6}>
                    <Row>
                        <Container className={styles.carousel}> 
                            <CarouselComponent props={prod.images}/>
                        </Container>
                    </Row>
                    <Row>
                        <Container className={styles.carousel}>
                            <h3 className={styles.technicalDescription}>Also Recommended:</h3>
                            <RecomendedProducts props={recomended} />
                        </Container>
                    </Row>
                </Col>
                <Col md={6}>
                    <Container className={styles.panel}>
                        <div className={styles.productName}>{prod.name}</div>
                        <Container>
                            <Row className={styles.prodStats} >
                                <Col>
                                    <div className={styles.favorite}>
                                        <Button style={appStyles}
                                                onClick={ !fav ? () => {setfavBC("rgb(255, 0, 0)"), setfav(true)} :
                                                                 () => {setfavBC("rgb(0, 0, 0)"), setfav(false)} }  
                                                >
                                            <div className={styles.buttonFav} >{!fav ? <BsHeart/> : <BsHeartFill/>} Favorite</div>
                                        </Button>
                                    </div>

                                </Col>
                                <Col>
                                    <div className={styles.reviews}>{prod.number_scores} reviews</div>
                                    <div className={styles.stars}>{computeStars(prod.score)}</div> 
                                </Col>
                            </Row>
                            <Row>
                                <Proposals proposals={proposals}/>
                            </Row>
                        </Container>

                        <Container className={styles.table1}>
                            <Table responsive borderless >
                                <tbody>
                                    <th> 
                                        {Object.values(prod.characteristic).map((key, value) => (
                                          <tr key={value}>{key.name}</tr>
                                        ))}
                                    </th>
                                    <td>
                                        {Object.values(prod.characteristic).map((key, value) => (
                                            <tr key={value}>{key.value}</tr>
                                        ))}
                                    </td>
                                </tbody>
                            </Table>
                        </Container>       
                        <div className={styles.description}>{prod.description}</div>
                        <h3 className={styles.technicalDescription}>Technical Description</h3>
                            <ListGroup>
                                {Object.values(prod.tecnical).map((key, value) => (
                                <ListGroupItem  key={value}><span className={styles.description2}>{key.split(":")[0]+":"}</span> <span>{key.split(":")[1]}</span></ListGroupItem>
                                ))}      
                            </ListGroup>
                    </Container> 
                </Col>   
            </Row>
    
            <Row md={12}>
                <div className={styles.reviewTop}>
                <span className={styles.reviewName}>Reviews</span>
                <span>
                    <Button type="submit" 
                        variant="secundary"
                        className={styles.buttonComment}
                        onClick={() => setModalShow(true)}>
                    New Review
                    </Button>
                    <MyModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      id={prod._id}
                    />
                </span>
                </div>
                <Container className={styles.panelReviews}>
                    <Reviews props1={commentsOrd} id={prod._id}/>
                </Container> 
            </Row>
        </>
    )
}

export default Product