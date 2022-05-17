import React from 'react'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import ImageCardQueue from './ImageCardQueue';
import InputBar from './InputBar';
import "./componentStyles/QueuePanel.css";

const QueueNew = ({ selectedResults, deselectFromQueue, createNewCollection, updateCollection, listCollections, setListCollections }) => {
    
    const [refreshQueuePanel, setRefreshQueuePanel] = useState(0); 

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

    const [labelsForUpdateBtn, setLabelsForUpdateBtn] = useState([]); 
    useEffect(() => {
        const updateLabels = () => {
            if (listCollections.length > 0){
                setLabelsForUpdateBtn(listCollections);  
            }
        }
        updateLabels(); 
    }, [listCollections]);  
    
    let updateBtnOptions = [];  
    console.log(labelsForUpdateBtn.length); 
    const updateTheDamnLabels = () => {
        for (let i = 0; i < labelsForUpdateBtn.length; i++){
            updateBtnOptions.push(labelsForUpdateBtn[i].title); 
        }
    }
    updateTheDamnLabels(); 

    let renderedImages = selectedResults.map((image) => {
        return (
            <ImageCardQueue key={image.id} 
                image={image} 
                deselectFromQueue={deselectFromQueue} 
            />
        )
    })

    const onAddSelectionsClick = (input) => {
        createNewCollection(selectedResults, input);
        setRefreshQueuePanel(refreshQueuePanel + 1); 
        updateTheDamnLabels(); 
    }

    

    const dropDownConfig = {
        onSelect: updateCollection,
        btnLabel: 'Add to Existing Collection',
        customOptions: updateBtnOptions,
        dropDownDisabled: false,
        eventKeys: updateBtnOptions
    }

    let displayDefaultPanel; 
    if (selectedResults.length > 0){
        displayDefaultPanel = 'none';
    } else {
        displayDefaultPanel = 'flex';
    }
    
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
                <InputBar 
                    onSubmit={onAddSelectionsClick}
                    label={null} 
                    placeholder="Enter Title of Your New Collection..." 
                    btn1Text="New Collection" 
                    btn2Text="Add to Existing Collection Instead" 
                    altText="Add all images in your queue to a new or existing collection!"
                    dropDownConfig={dropDownConfig}
                    listCollections={listCollections} 
                />
            </div>
        </div>
    )
}

export default QueueNew; 