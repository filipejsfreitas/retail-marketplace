import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery'

function ProductImage(){

    const[Images, setImages] = useState([])
    useEffect(()=> {
        let images = [
            {
              original: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
              thumbnail: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
            },
            {
              original: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
              thumbnail: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
            },
            {
              original: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
              thumbnail: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
            },
            {
              original: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
              thumbnail: 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
            }
          ];

        setImages(images)
    })

  
    return(
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage;