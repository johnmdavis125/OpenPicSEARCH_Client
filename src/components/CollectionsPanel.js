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

    let displayDefaultPanel; 
    if (Object.keys(collection).length > 0){
        displayDefaultPanel = 'none';
    } else {
        displayDefaultPanel = 'flex';
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
                <div className='defaultDiv' style={{display: displayDefaultPanel, marginLeft: '25%'}}>
                    <img src='/OpenPixLogoV2.png' style={{maxWidth: '250px', marginBottom: '25px'}}/>
                    <h5>Welcome to the Collections Panel!</h5>
                    <p>You can view all of your collections here</p>
                    <br />
                    <p>Click one of the options in the left side panel to get started!</p>                
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