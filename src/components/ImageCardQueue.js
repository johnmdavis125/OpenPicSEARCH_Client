import React from 'react'; 
import { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import './componentStyles/ImageCardQueue.css';

const ImageCardQueue = ({ image, deselectFromQueue }) => {
    
    const deselect = () => {
        deselectFromQueue(image); 
    }

   // Image Positioning
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

let config = {
    imageTitle: '',
    imgSrc: '',
    apiName: '',
    photographer: '',
    portfolioLink: ''
  };

  if (image.hasOwnProperty('urls')){
    config = {
        imageTitle: image.description ? image.description : 'Untitled',
        imgSrc: image.urls.regular,
        apiName: 'Unsplash',
        photographer: image.user.name,
        portfolioLink: image.user.links.portfolio
    }
  } else if (image.hasOwnProperty('src')){
    config = {
        imageTitle: image.alt ? image.alt : 'Untitled',
        imgSrc: image.src.medium,
        apiName: 'Pexels',
        photographer: image.photographer,
        portfolioLink: image.photographer_url
    }  
  } else if (image.hasOwnProperty('webformatURL')){
    config = {
        imageTitle: image.tags ? image.tags : 'Untitled',
        imgSrc: image.webformatURL,
        apiName: 'Pixabay',
        photographer: image.user,
        portfolioLink: image.userImageURL
    }   
  } else {
      console.log('hasOwnProperty conditional did not work in ImageCardQueueNew'); 
  }


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
                        variant="dark">
                    </CloseButton>
                </div>
                <Card.Text>
                    <p>Image Source: {config.apiName}</p>
                    <p>Photographer: {config.photographer}</p>
                    <a href={config.portfolioLink}>Photographer Portfolio</a>
                </Card.Text>
            </Card.Body>
            </div>
        </Card>
    )
}

export default ImageCardQueue; 