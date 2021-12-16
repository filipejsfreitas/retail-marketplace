import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery'

const ProductImage = (props) => {
    const imagesrc = "http://localhost:3001/"
    const defImg = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    var images = [];
    const[Images, setImages] = useState([])
    useEffect(()=> {
        if(props.props.length==0){
            images.push({ original: defImg  , thumbnail: defImg })
            setImages(images)
        }
        else{
            props.props.forEach((elem) => {
                images.push(
              { original: imagesrc + elem  , thumbnail: imagesrc + elem })
            });
            setImages(images)
        }
    }, [])
    
    return(
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage;