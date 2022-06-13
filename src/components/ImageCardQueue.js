import React from 'react'; 
import { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import './componentStyles/ImageCardQueue.css';
import { configImageCardQueue } from './utils/utilMethods.mjs';

const ImageCardQueue = ({ image, deselectFromQueue }) => {
    
    // User Deselects Image from Queue
    const deselect = () => {
        deselectFromQueue(image); 
    }

   // Onload, set image positioning
   const [spans, setSpans] = useState(0);
   const ref = useRef(); 
   
   useEffect(() => {
       if (ref.current){
       const current = ref.current;
       current.addEventListener('load', () => {
       const height = ref.current.clientHeight;
       const numSpans = Math.ceil(height / 10); 
       setSpans(numSpans);
       })
    } 
   },[]);

   // Configure cards in queue per source
   let config = configImageCardQueue(image); 

    return (
        <Card style={{ gridRowEnd: `span ${spans}`, width: '800px'}} className='queueCard'>
            <div style={{display: 'flex'}}>
            <Card.Img 
                className="queueImage" 
                ref={ref}
                src={config.imgSrc} 
                variant="top" 
            />
            <Card.Body>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Card.Title>{config.imageTitle}</Card.Title>
                    <CloseButton 
                        onClick={deselect}
                        className="closeButton"
                        style={{color: 'white', opacity: '0.5'}}
                    >
                    </CloseButton>
                </div>
                <Card.Text>
                    <span>Image Source: {config.apiName}</span><br />
                    <span>Photographer: {config.photographer}</span><br />
                    <span><a href={config.portfolioLink}>Photographer Portfolio</a></span>
                </Card.Text>
            </Card.Body>
            </div>
        </Card>
    )
}

export default ImageCardQueue; 