import React from 'react';
import { useState, useEffect, useRef } from 'react';

const ImageCard = ({image}) => {
    
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

    return (
    <div style={{gridRowEnd: `span ${spans}`}}>
        <img ref={ref} src={image.urls.regular} />
    </div>
    )
}

export default ImageCard; 