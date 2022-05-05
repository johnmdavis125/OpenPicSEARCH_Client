import React from 'react'; 
import { useState, useEffect, useRef } from 'react';
import './ImageCard.css';

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
        updateQueue(image); 
    }

    if (apiName === "Pexels"){
        return (
        <div style={{gridRowEnd: `span ${spans}`}}>
            <img
                onClick={(event) => selectImage(event)}
                className='image'
                ref={ref}
                src={image.src.medium}
            />
        </div>
        )
    } else if (apiName === "Unsplash"){
        return (
            <div style={{gridRowEnd: `span ${spans}`}}>
                <img
                onClick={(event) => selectImage(event)} 
                className='image'
                ref={ref}
                src={image.urls.regular} />
            </div>
        )
    } else if (apiName === "Pixabay"){
        return (
            <div style={{gridRowEnd: `span ${spans}`}}>
                <img
                onClick={(event) => selectImage(event)}
                className='image'
                ref={ref} 
                src={image.webformatURL} />
            </div>
            )
    }
}

export default ImageCard; 