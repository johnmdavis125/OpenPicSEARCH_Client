import React from 'react'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import ImageCardQueue from './ImageCardQueue';
import QueueInputBar from './QueueInputBar';
import "./componentStyles/Queue.css";
import { formatImgArray as reFormat } from './utils/utilMethods.mjs';

const Queue = ({ selectedResults, setSelectedResults, deselectFromQueue, listCollections, setListCollections }) => {

// On Queue Load, pull current collections from database to update dropdown options
useEffect(() => {
    async function getCollections() {
        try {
            const response = await axios.get('http://localhost:3001/api/collections');
            console.log(response);
            console.log(response.data);
            setListCollections(response.data); 
        } catch (error) {
            console.error(error);
        }
    }
    getCollections(); 
},[]);

    let updateFormOptions = []; 
    const resetDropdownLabels = () => {
        if (listCollections.length > 0){
            for (let i = 0; i < listCollections.length; i++){
                updateFormOptions.push(listCollections[i].title);
            }
        }
    }
    resetDropdownLabels(); 

// User Updates an Existing Collection
const [collection4Update, setCollection4Update] = useState({}); 

const updateCollection = async (unformattedImgArrForUpdatingCol, colIDToUpdate, colToUpdateTitle) => {
    let newImages = reFormat(unformattedImgArrForUpdatingCol, colToUpdateTitle).images; 
    let existingImages = collection4Update.images; 
    let updatedImgArray = [...existingImages, ...newImages]; 
    
    const formattedInput = {
        title: colToUpdateTitle,
        images: updatedImgArray
    }
    
    await axios.put(`http://localhost:3001/api/collections/${colIDToUpdate}`, formattedInput)
    .then(function (response) {
    })
    .catch(function (error) {
        console.log(error);
    });
    setSelectedResults([]);    
}      

useEffect(() => {
    const run = () => {
        if (collection4Update.title){
            updateCollection(selectedResults, collection4Update._id, collection4Update.title); 
        }
    }
    run(); 
}, [collection4Update]); 

// UpdateCollection Logic Starts Here (User selects dropdown option)
const getColToUpdateFromDB = async (colToUpdateTitle) => {
    let collectionID;
    const tempArray = listCollections.map((col) => {
        if (col.title === colToUpdateTitle){
          collectionID = col._id;   
        }
        return collectionID; 
    });
    try {
        const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
        setCollection4Update(response.data); 
        } catch (error) {
        console.error(error);
        }
}      

// User Creates a New Collection
const createNewCollection = (unformattedImgArrForNewCol, colTitle) => {
    let formattedInput = reFormat(unformattedImgArrForNewCol, colTitle); 
    
    axios.post('http://localhost:3001/api/collections', formattedInput)
    .then(function (response) {
    })
    .catch(function (error) {
        console.log(error);
    });
    setSelectedResults([]);
}

const onNewCollectionBtnClick = (userCustomTitle) => {
    if (userCustomTitle === ''){
        userCustomTitle = 'Untitled';
    }
    createNewCollection(selectedResults, userCustomTitle);
    resetDropdownLabels(); 
} 

// Handle default panel display status
    let displayDefaultPanel; 
    if (selectedResults.length > 0){
        displayDefaultPanel = 'none';
    } else {
        displayDefaultPanel = 'flex';
    }

// Configure Image Cards to Render
    let renderedImages = selectedResults.map((image) => {
        return (
            <ImageCardQueue key={image.id} 
            image={image} 
            deselectFromQueue={deselectFromQueue} 
            />
            )
        })
        
    return (
        <div className="queuePanelMainDiv">
            <div className="upperDiv">
                <h5 className="panelTitle" style={{paddingLeft: '15px'}}>QUEUE</h5>
            </div>
            <div className='defaultDiv' style={{display: displayDefaultPanel}}>
                <img src='/OpenPixLogoV2.png' style={{maxWidth: '250px', marginBottom: '25px'}}/>
                <h5>Welcome to the Queue Panel!</h5>
                <p>All of your selected images will show up here.</p>
                <br />
                <p>It looks like you haven't made any selections yet. Head over to the Search Tab to get started!</p>                
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="queueImagesContainer">
                    {renderedImages}
                </div>        
            </div>
            <div>
                <QueueInputBar 
                    onSubmit={onNewCollectionBtnClick} 
                    onSelect={getColToUpdateFromDB}
                    customOptions={updateFormOptions}
                    eventKeys={updateFormOptions}
                />
            </div>
        </div>
    )
}

export default Queue; 