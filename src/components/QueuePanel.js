import React from 'react';
import ImageCardQueue from './ImageCardQueue';
import "./Panel.css";

const QueuePanel = ({ selectedResults }) => { 
    let renderedImages = selectedResults.map((image) => {
        return (
            <ImageCardQueue key={image.id} image={image} />
        )
    })
    
    return (
        <div className="panelMainDiv">
            <div className="upperDiv">
                <h5 className="panelTitle" style={{paddingLeft: '15px'}}>QUEUE</h5>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{flexBasis: '90%'}} className="imagesContainer">    {renderedImages}
                </div>        
            </div>
        </div>
    )
}

export default QueuePanel; 