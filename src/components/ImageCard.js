import React from 'react'; 
import { useState, useEffect, useRef } from 'react';
import './componentStyles/ImageCard.css';

const ImageCard = ({ image, apiName, updateQueue }) => {
    
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

      const selectImage = (event) => {
          event.target.classList.toggle('selected'); 
        //   selected = !selected;
          updateQueue(image); 
      }

    let imgSrc = '';
    if (apiName === "Pexels"){
        imgSrc = image.src.medium;
    } else if (apiName === "Unsplash"){
        imgSrc = image.urls.regular
    } else if (apiName === "Pixabay"){
        imgSrc = image.webformatURL
    } else {
        console.log('conditional config in ImageCard did not work'); 
    }
    
    return (
        <div style={{gridRowEnd: `span ${spans}`}}>
            <img
                onClick={(event) => selectImage(event)}
                className='image'
                ref={ref}
                src={imgSrc}
            />
        </div>
    )
}

export default ImageCard; 