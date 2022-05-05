import React from 'react';
import Panel from './Panel'; 
import { useState } from 'react'; 
import CustomDropDown from './CustomDropdown';

const PanelContainer = ({ unsplashImages, pexelsImages, pixabayImages, updateQueue }) => {
    
    const [panels, setPanels] = useState({
        pexels: 1,
        unsplash: 1,
        pixabay: 1
    }); 

    let panelsInput;
    let numPexelsPanels = panels.pexels; 
    let numUnsplashPanels = panels.unsplash;
    let numPixabayPanels = panels.pixabay;  
    // Delete Panels Button(s)
    const onDeleteClick = (clickedPanel) => {
        console.log(`delete button clicked on panel: ${clickedPanel}`); 
        
        if (clickedPanel === 'Pexels' && numPexelsPanels === 0){
            return; 
        } else if (clickedPanel === 'Pexels'){
            panelsInput = {
            pexels: numPexelsPanels - 1,
            unsplash: numUnsplashPanels,
            pixabay: numPixabayPanels
            }
        }

        if (clickedPanel === 'Unsplash' && numUnsplashPanels === 0){
            return;
        } else if (clickedPanel === 'Unsplash'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels - 1,
                pixabay: numPixabayPanels
            }
        }
       
        if (clickedPanel === 'Pixabay' && numPixabayPanels === 0){
            return;
        } else if (clickedPanel === 'Pixabay'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels,
                pixabay: numPixabayPanels - 1
            }
        }
        setPanels(panelsInput); 
    }
    
    // Dropdown
    let dropdownDisabled = false; 
    if (numPexelsPanels + numUnsplashPanels + numPixabayPanels === 3){
        dropdownDisabled = true; 
    }
    const onAddPanelDropdownClick = (event) => {
        const selection = event; 
        if (selection === 'pexels'){
            panelsInput = {
                pexels: numPexelsPanels + 1,
                unsplash: numUnsplashPanels,
                pixabay: numPixabayPanels
            }
        } else if (selection === 'unsplash'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels + 1,
                pixabay: numPixabayPanels
            } 
        } else if (selection === 'pixabay'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels,
                pixabay: numPixabayPanels + 1
            }
        } else {
            console.log('invalid response'); 
        }
        setPanels(panelsInput); 
    }    

    // Conditional Render Panels
    let arrKeys = Object.keys(panels);
    let itemsToRender = []; 
    for (let i = 0; i < arrKeys.length; i++){
         for (let j = 0; j < panels[arrKeys[i]]; j++){
            if (arrKeys[i] === 'unsplash'){
                itemsToRender.push(
                    <Panel
                        images={unsplashImages}
                        apiName='Unsplash'
                        onDeleteClick={onDeleteClick}
                        updateQueue={updateQueue}
                    />);
            } else if (arrKeys[i] === 'pexels'){
                itemsToRender.push(
                    <Panel
                        images={pexelsImages}
                        apiName='Pexels'
                        onDeleteClick={onDeleteClick}
                        updateQueue={updateQueue}
                    />);
            } else if (arrKeys[i] === 'pixabay'){
                itemsToRender.push(
                    <Panel
                        images={pixabayImages} 
                        apiName='Pixabay'
                        onDeleteClick={onDeleteClick}
                        updateQueue={updateQueue}
                    />);
            } else {
                console.log('illegitimate key, initiate debug'); 
            }
         }
    }       

    const options = ['Pexels', 'Unsplash', 'Pixabay'];
    return (
        <div>
            <div style={{display: 'flex', overflowX: 'auto', margin: '5px'}}>
                {itemsToRender}
            </div>
            <CustomDropDown 
                onSelect={onAddPanelDropdownClick}
                btnLabel='Add Panel' 
                customOptions={options}
                dropdownDisabled={dropdownDisabled}
            />
        </div> 
    )
}

export default PanelContainer; 