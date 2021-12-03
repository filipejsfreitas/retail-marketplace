import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery'

function ProductImage(props){
  
    var images = [];
    const[Images, setImages] = useState([])
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