import React from 'react';
import ImageCardQueue from './ImageCardQueue';
import CustomDropDown from './CustomDropdown';
import "./QueuePanel.css";

const QueuePanel = ({ selectedResults, deselectFromQueue }) => { 
    let renderedImages = selectedResults.map((image) => {
        return (
            <ImageCardQueue key={image.id} 
                image={image} 
                deselectFromQueue={deselectFromQueue} 
            />
        )
    })

    // Dropdown configuration
    const options = ['option1', 'option2', 'option3'];
    const eventKeys = ['option1', 'option2', 'option3']; 
    const dropdownDisabled = false; 
    const onAddSelectionsClick = (event) => {
        console.log('add selections button was clicked'); 
        console.log(`user selected: ${event}`); 
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
                <CustomDropDown 
                    onSelect={onAddSelectionsClick}
                    btnLabel='Add Selections' 
                    customOptions={options}
                    dropdownDisabled={dropdownDisabled}
                    eventKeys={eventKeys}
                />
            </div>
        </div>
    )
}

export default QueuePanel; 