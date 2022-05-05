import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './ImageCard.css';

const ImageCardQueue = ({ image }) => {
    
       // Image Positioning
       const [spans, setSpans] = useState(0);
       const ref = useRef(); 
       
       useEffect(() => {
           const current = ref.current;
           current.addEventListener('load', () => {
           const height = ref.current.clientHeight;
           const numSpans = Math.ceil(height / 10); 
           setSpans(numSpans);
   
           }) 
       },[]);

    if (image.hasOwnProperty('urls')){
        return (
            <div style={{gridRowEnd: `span ${spans}`}}>
                <img
                className='image'
                ref={ref}
                src={image.urls.regular} />
            </div>
        )
    } else if (image.hasOwnProperty('src')){
        return (
            <div style={{gridRowEnd: `span ${spans}`}}>
                <img
                className='image'
                ref={ref}
                src={image.src.medium} />
            </div>
        ) 
    } else if (image.hasOwnProperty('webformatURL')){
        return (
            <div style={{gridRowEnd: `span ${spans}`}}>
                <img
                className='image'
                ref={ref}
                src={image.webformatURL} />
            </div>
        )
    }
}

export default ImageCardQueue; 