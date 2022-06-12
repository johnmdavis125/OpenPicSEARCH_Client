import React from 'react'; 
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import Card from 'react-bootstrap/Card'; 
import Button from 'react-bootstrap/Button'; 
import CloseButton from 'react-bootstrap/CloseButton';
import './componentStyles/Collections.css'; 


const Collections = ({ listCollections, setListCollections, deleteCollection }) => {

    const [collection, setCollection] = useState({}); 

    useEffect(() => {
        async function updateCollections() {
            try {
            const response = await axios.get('http://localhost:3001/api/collections');
            console.log(response);
            console.log(response.data);
            console.log('message2');
            setListCollections(response.data); 
        } catch (error) {
            console.error(error);
        }
    }
    updateCollections(); 
    },[collection]);  

    async function getCollection(collectionID) {
        try {
            const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
            setCollection(response.data); 
        } catch (error) {
            console.error(error);
        }
    }

    let renderedCollectionsList;
    const getRenderedCollectionsList = () => {
        console.log('message1');
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

    
    const deleteMe = () => {
        deleteCollection(collection._id); 
        requestAnimationFrame(() => setCollection({}));
        requestAnimationFrame(getRenderedCollectionsList);
    }

    let displayDefaultPanel; 
    let displayDeleteButton;
    if (Object.keys(collection).length > 0){
        displayDefaultPanel = 'none';
        displayDeleteButton = 'flex';
    } else {
        displayDefaultPanel = 'flex';
        displayDeleteButton = 'none';
    }

    let renderedImages; 
    Object.keys(collection).length > 0 ? 
    renderedImages = collection.images.map((image) => {
        return (
            <Card key={image._id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image.imgSrc} />
            </Card>
        )
    }) : renderedImages = []; 
       
    return (
        <div className='collectionsMain'>
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
                        style={{display: displayDeleteButton, color: 'white', opacity: '0.5'}}
                        >
                    </CloseButton>
                </div>
            </div>

        </div>
    )
}

export default Collections; 