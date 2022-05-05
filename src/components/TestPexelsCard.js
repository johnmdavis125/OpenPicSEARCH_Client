import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './ImageCard.css';

const TestPexelsCard = ({image, updateQueue }) => {
    
    // Image Positioning
    // const [spans, setSpans] = useState(0);
    // const ref = useRef(); 
    
    // useEffect(() => {
    //     const current = ref.current;
    //     current.addEventListener('load', () => {
    //     const height = ref.current.clientHeight;
    //     const numSpans = Math.ceil(height / 10); 
    //     setSpans(numSpans);

    //     }) 
    // },[]);

    // Image Selection
    // const selectImage = (event) => {
    //     event.target.classList.toggle('selected'); 
    //     updateQueue(image); 
    // }

    console.log(`image keys in PexelsCard: ${Object.keys(image)}`);

    return (
    // <div style={{gridRowEnd: `span ${spans}`}}>
    //     <img
            // onClick={(event) => selectImage(event)}
            // className='image'
            // ref={ref}
            // src={image.src.medium}
        // />
    // </div>
        <div>
            <img src={image.src.medium} />
        </div>
    )
}

export default TestPexelsCard; 