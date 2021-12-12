import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery'

const ProductImage = (props) => {
  
    var images = [];
    const[Images, setImages] = useState([])

    console.log(props.props),
    console.log("---------------------"),
    useEffect(()=> {  
        props.props.forEach((elem) => {
          images.push(
          { original: elem  , thumbnail: elem  })
        });
        
        setImages(images)
    })

  
    return(
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage;