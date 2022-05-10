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

    console.log(`panels: ${panels.pexels}`); 
    console.log(`panels: ${panels.unsplash}`); 
    console.log(`panels: ${panels.pixabay}`); 

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
        console.log(`selection: ${selection}`)
        if (selection === 'Pexels'){
            panelsInput = {
                pexels: numPexelsPanels + 1,
                unsplash: numUnsplashPanels,
                pixabay: numPixabayPanels
            }
        } else if (selection === 'Unsplash'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels + 1,
                pixabay: numPixabayPanels
            } 
        } else if (selection === 'Pixabay'){
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
    const eventKeys = ['pexels', 'unsplash', 'pixabay'];
    return (
        <div>
            <div style={{display: 'flex', overflowX: 'auto', margin: '5px'}}>
                {itemsToRender}
            </div>
            <div style={{minWidth: '20%', marginLeft: '40%', marginRight: '40%'}}>
                <CustomDropDown className="panelDropdown" 
                    onSelect={onAddPanelDropdownClick}
                    btnLabel='Add Panel' 
                    customOptions={options}
                    dropdownDisabled={dropdownDisabled}
                    eventKeys={eventKeys}
                />
            </div>
        </div> 
    )
}

export default PanelContainer; 