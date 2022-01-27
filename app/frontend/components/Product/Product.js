import { Container, ListGroup, Button, Table, Row, Col, ListGroupItem } from "react-bootstrap"
import React, { useEffect } from "react"
import styles from 'styles/Product/product.module.css'
import RecomendedProducts from "./Carousel2"
import CarouselComponent from "./Carousel"
import { BsFillStarFill, BsStarHalf, BsStar, BsArrowRightCircle, BsHeart, BsHeartFill} from "react-icons/bs";
import Reviews from "./Review"
import MyModal from "./Comment"
import Proposals from "./Proposals"
import {useState} from "react";
import { setFavoriteOff, setFavoriteOn } from "helper/ProductPageHelper"
import Link from "next/link";
import useFetchAuth from "hooks/useFetchAuth"

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
    const recommended = props.recommended
    
    const favoriteProducts = props.favs
    const [fav, setfav] = useState(null)
    
    const isLog = favoriteProducts == null ? false : true

    useEffect(async () => {
        if (favoriteProducts == null) {
            setfav(false)
        }
        else if (favoriteProducts.favoriteProducts.includes(idP)) {
            setfav(true)
        } else {
            setfav(false)
        }
    }, [])

    const appStyles={
      background:"#ffffff",
      border: 0,
      color: !fav ? "rgb(0, 0, 0)" : "rgb(255, 0, 0)",
      outline: 0,
      boxShadow:"0px 0px 0px 0px black"
    }
    
    const prod = props.prod
    const idP = prod._ids
    const proposals = props.proposals
    const cats = props.cats
    const catsOrd = []
        cats.map(cat =>
            catsOrd.push(cat.name)
        )
    catsOrd.reverse()
    const commentsOrd = prod.comments.sort((a, b) =>  new Date(b.date) - new Date(a.date))
    const { fetchAuth } = useFetchAuth()
    return (            
           <>
            <Row md={12}>
                <div className={styles.title}> 
                  <Link href="/">Home</Link>
                      {catsOrd.map((cat, i) => {
                        const url = catsOrd.slice(0, i+1).reduce((acc, cat) => acc.concat("/").concat(cat), "")
                        return (
                          <span key={i}>
                            <BsArrowRightCircle className={styles.arrow}/>
                              <Link href={url}>
                                {cat}
                              </Link>
                          </span>
                        )
                        }
                      )}
                </div>
                

                <Col md={6}>
                    <Row>
                        <Container className={styles.carousel}> 
                            <CarouselComponent props={prod.images}/>
                        </Container>
                    </Row>
                    <Row>{recommended &&
                        <Container className={styles.carousel}> 
                            <h3 className={styles.technicalDescription}>Also Recommended:</h3>
                            <RecomendedProducts props={recommended} />
                        </Container>}
                    </Row>
                </Col>
                <Col md={6}>
                    <Container className={styles.panel}>
                        <div className={styles.productName}>{prod.name}</div>
                        <Container>
                            <Row className={styles.prodStats} >
                                <Col>
                                    <div className={styles.favorite}>
                                        <Button id="buttonFav" style={appStyles}
                                                disabled={isLog ? false : true}
                                                onClick={async()  => {
                                                    const reply = await (fav ? setFavoriteOff(idP,fetchAuth) : setFavoriteOn(idP,fetchAuth))
                                                    if(reply == 1)
                                                        setfav(f => !f)
                                                }}
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
                                <Proposals proposals={proposals} isLog={isLog}/>
                            </Row>
                        </Container>

                        <Container className={styles.table1}>
                            <Table responsive borderless >
                                <tbody>
                                    <th>{prod.characteristic ?  
                                        Object.values(prod.characteristic).map((key, value) => (
                                          <tr key={value}>{key.name}</tr>
                                        )) : []}
                                    </th>
                                    <td>
                                        {prod.characteristic ? 
                                        Object.values(prod.characteristic).map((key, value) => (
                                            <tr key={value}>{key.value}</tr>
                                        )) : []}
                                    </td>
                                </tbody>
                            </Table>
                        </Container>       
                        <div className={styles.description}>{prod.description}</div>
                        <h3 className={styles.technicalDescription}>Technical Description</h3>
                            <ListGroup>
                                {prod.tecnical ?
                                Object.values(prod.tecnical).map((key, value) => (
                                <ListGroupItem  key={value}><span className={styles.description2}>{key.split(":")[0]+":"}</span> <span>{key.split(":")[1]}</span></ListGroupItem>
                                )) : []}      
                            </ListGroup>
                    </Container> 
                </Col>   
            </Row>
    
            <Row md={12}>
                <Container className={styles.panelReviews}>
                    <Reviews 
                        prod={prod} 
                        id={prod._id} 
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        isLog={isLog} 
                        props1={commentsOrd} 
                        id={prod._id}/>
                </Container> 
            </Row>
        </>
    )
}

export default Product