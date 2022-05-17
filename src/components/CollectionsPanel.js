import React from 'react';
import axios from 'axios'; 
import { useState, useEffect } from 'react'; 
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import CloseButton from 'react-bootstrap/CloseButton';
import './componentStyles/CollectionsPanel.css'; 

const CollectionsPanel = ({ collection, setCollection, deleteCollection, listCollections, setListCollections, getCollection }) => {
    
    const [refresh, setRefresh] = useState(false); 

    useEffect(() => {
        async function updateCollections() {
            try {
            const response = await axios.get('http://localhost:3001/api/collections');
            console.log(response);
            console.log(response.data);
            setListCollections(response.data); 
        } catch (error) {
            console.error(error);
        }
    }
    updateCollections(); 
    },[refresh]);  

    let renderedCollectionsList;
    const getRenderedCollectionsList = () => {
        renderedCollectionsList = listCollections.map((col) => {
            return (
                <Button 
                    key={col._id}
                    className='listBtn'
                    onClick={() => getCollection(col._id)}
                >{col.title}</Button>
                );
            });
    }
    getRenderedCollectionsList(); 

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
        delayedFunction(); 
    }
    
    const delayedFunction = () => {
        setRefresh(!refresh);  
        moreDelayedFunction(); 
    }

    const moreDelayedFunction = () => {
        setCollection({}); 
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