import React from 'react';
import ImageCardQueue from './ImageCardQueue';
import "./QueuePanel.css";

const QueuePanel = ({ selectedResults }) => { 
    let renderedImages = selectedResults.map((image) => {
        return (
            <ImageCardQueue key={image.id} image={image} />
        )
    })
    
    return (
        <div className="queuePanelMainDiv">
            <div className="upperDiv">
                <h5 className="panelTitle" style={{paddingLeft: '15px'}}>QUEUE</h5>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="queueImagesContainer">
                    {renderedImages}
                </div>        
            </div>
        </div>
    )
}

export default QueuePanel; 