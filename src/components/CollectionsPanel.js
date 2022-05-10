import React from 'react';
import { useRef } from 'react'; 
import Card from 'react-bootstrap/Card'; 
import CloseButton from 'react-bootstrap/CloseButton';
import './CollectionsPanel.css'; 

const CollectionsPanel = ({ collection, setCollection, renderedCollectionsList, deleteCollection }) => {
    let renderedImages; 
    Object.keys(collection).length > 0 ? 
    renderedImages = collection.images.map((image) => {
        return (
            <Card key={image.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image.imgSrc} />

            </Card>
        )
    }) : renderedImages = []; 

    const deleteMe = () => {
        console.log('run delete me function'); 
        console.log(collection._id); 
        console.log(collection.title); 

        deleteCollection(collection._id); 
        console.log(renderedCollectionsList); 
    }

    return (
        <div className="collectionsPanelMainDiv">
            <div className="upperDiv">
                <h4 className="panelTitle">Collections Panel</h4>
            </div>
            
            <div className='collectionsPanelMainInner'>
                <div className='listSidePanel'>
                    {renderedCollectionsList}
                </div>
                <div className="collectionsPanelImagesContainer">
                        {renderedImages}       
                </div>
                <CloseButton 
                    onClick={deleteMe}
                    className="closeButton"
                    style={{color: 'white', opacity: '0.5'}}
                    variant="dark">
                </CloseButton>
            </div>
        </div>
    )
}

export default CollectionsPanel; 