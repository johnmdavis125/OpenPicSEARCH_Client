import React from 'react';
import ImageCard from './ImageCard';
import "./Panel.css";

const Panel = ({images, apiName}) => {
    
    const renderedImages = images.map((image) => {       
        return (
            <ImageCard key={image.id} image={image} />
        )
    })

    return (
        <div>
            <div>{apiName} Panel</div>
            <div className="imagesContainer">{renderedImages}</div>        
        </div>
    )
}

export default Panel; 