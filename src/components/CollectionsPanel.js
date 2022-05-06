import React from 'react';
import Card from 'react-bootstrap/Card'; 
import './CollectionsPanel.css'; 

const CollectionsPanel = ({ collectionImages }) => {
    let renderedImages; 
    Object.keys(collectionImages).length > 0 ? 
    renderedImages = collectionImages.images.map((image) => {
        return (
            <Card key={image.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image.imgSrc} />
                {/* <Card.Body>
                    <Card.Title>{image.description}</Card.Title>
                    <Card.Text>
                    Photographer: {image.photographer}
                    </Card.Text>
                </Card.Body> */}
            </Card>
        )
    }) : renderedImages = []; 
    
    return (
        <div className="collectionsPanelMainDiv">
            <div className="upperDiv">
                <h4 className="panelTitle">Collections Panel</h4>
            </div>
                <div className="collectionsPanelImagesContainer">
                    {renderedImages}       
            </div>
        </div>
    )
}

export default CollectionsPanel; 