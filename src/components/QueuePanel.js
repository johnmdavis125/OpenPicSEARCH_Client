import React from 'react';
import ImageCardQueue from './ImageCardQueue';
import InputBar from './InputBar';
import "./QueuePanel.css";

const QueuePanel = ({ selectedResults, deselectFromQueue, createNewCollection, updateCollection }) => { 
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
    }

    // Shift the dropdown to the top of the panel (reuse searchBar component**)
    // Add input for name of new Collection to be created - with button
    // Dropdown will present all of the existing collections as options (update route) // next to button**, similar to search bar

    const dropDownConfig = {
        onSelect: updateCollection,
        btnLabel: 'Add to Existing Collection',
        customOptions: ['Collection1', 'Collection2', 'Collection3'],
        dropDownDisabled: false,
        eventKeys: ['collection1', 'collection2', 'collection3']
    }

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
            <div>
                <InputBar 
                    onSubmit={onAddSelectionsClick}
                    label={null} 
                    placeholder="Enter Title of Your New Collection..." 
                    btn1Text="New Collection" 
                    btn2Text="Add to Existing Collection Instead" 
                    altText="Add all images in your queue to a new or existing collection!"
                    dropDownConfig={dropDownConfig} 
                />
            </div>
        </div>
    )
}

export default QueuePanel; 