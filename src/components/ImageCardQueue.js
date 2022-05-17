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
    let imageTitle;
    if (image.hasOwnProperty('urls')){
        console.log(image); 
        imageTitle = image.description ? image.description : 'Untitled';         
        return (
            <Card style={{ gridRowEnd: `span ${spans}`, width: '800px'}} className='queueCard'>
                <div style={{display: 'flex'}}>
                <Card.Img 
                    className="queueImage" 
                    ref={ref}
                    src={image.urls.regular} 
                    variant="top" 
                />
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Card.Title>{imageTitle}</Card.Title>
                        <CloseButton 
                            onClick={deselect}
                            className="closeButton"
                            style={{color: 'white', opacity: '0.5'}}
                            variant="dark">
                        </CloseButton>
                    </div>
                    <Card.Text>
                        <p>Image Source: Unsplash</p>
                        <p>Photographer: {image.user.name}</p>
                        <a href={image.user.links.portfolio}>Photographer Portfolio</a>
                    </Card.Text>
                </Card.Body>
                </div>
            </Card>
        )
    } else if (image.hasOwnProperty('src')){
        console.log(image);
        imageTitle = image.alt ? image.alt : 'Untitled';
        return (
            <Card style={{ gridRowEnd: `span ${spans}`, width: '800px'}} className='queueCard'>
                <div style={{display: 'flex'}}>
                <Card.Img 
                    className="queueImage" 
                    ref={ref}
                    src={image.src.medium} 
                    variant="top" 
                />
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Card.Title>{imageTitle}</Card.Title>
                        <CloseButton 
                            onClick={deselect}
                            className="closeButton"
                            style={{color: 'white', opacity: '0.5'}}
                            variant="dark">
                        </CloseButton>
                    </div> 
                    <Card.Text>
                        <p>Image Source: Pexels</p>
                        <p>Photographer: {image.photographer}</p>
                        <a href={image.photographer_url}>Photographer Portfolio</a> 
                    </Card.Text>
                </Card.Body>
                </div>
            </Card>
        ) 
    } else if (image.hasOwnProperty('webformatURL')){
        console.log(image);
        imageTitle = image.tags ? image.tags : 'Untitled';
        return (
            <Card style={{ gridRowEnd: `span ${spans}`, width: '800px'}} className='queueCard'>
                <div style={{display: 'flex'}}>
                <Card.Img 
                    className="queueImage" 
                    ref={ref}
                    src={image.webformatURL} 
                    variant="top" 
                />
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Card.Title>{imageTitle}</Card.Title>
                        <CloseButton 
                            onClick={deselect}
                            className="closeButton"
                            style={{color: 'white', opacity: '0.5'}}
                            variant="dark">
                        </CloseButton>
                    </div>
                    <Card.Text>
                        <p>Image Source: Pexels</p>
                        <p>Photographer: {image.user}</p>
                        <a href={image.userImageURL}>Photographer Portfolio</a>
                    </Card.Text>
                </Card.Body>
                </div>
            </Card>
        )
    }
}

export default ImageCardQueue; 