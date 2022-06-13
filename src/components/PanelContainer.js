import React from 'react';
import Panel from './Panel'; 
import { useState } from 'react'; 
import CustomDropDown from './CustomDropdown';
import "./componentStyles/PanelContainer.css";

const PanelContainer = ({ unsplashImages, pexelsImages, pixabayImages, updateQueue }) => {
    
    const [panels, setPanels] = useState({
        pexels: 1,
        unsplash: 1,
        pixabay: 1
    }); 

    let panelsInput;
    let numPexelsPanels = panels.pexels; 
    let numUnsplashPanels = panels.unsplash;
    let numPixabayPanels = panels.pixabay;  // object destructuring
    
    // Delete Panels Button(s)
    const onDeleteBtnClick = (panelName) => {             
        if (panelName === 'Pexels' && numPexelsPanels === 0){
            return; 
        } else if (panelName === 'Pexels'){
            panelsInput = {
            pexels: numPexelsPanels - 1,
            unsplash: numUnsplashPanels,
            pixabay: numPixabayPanels
            }
        }

        if (panelName === 'Unsplash' && numUnsplashPanels === 0){
            return;
        } else if (panelName === 'Unsplash'){
            panelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels - 1,
                pixabay: numPixabayPanels
            }
        }
       
        if (panelName === 'Pixabay' && numPixabayPanels === 0){
            return;
        } else if (panelName === 'Pixabay'){
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
    let panelsToRender = []; 
    for (let i = 0; i < arrKeys.length; i++){
         for (let j = 0; j < panels[arrKeys[i]]; j++){
            if (arrKeys[i] === 'unsplash'){
                panelsToRender.push(
                    <Panel
                        key={`${panels.unsplash}panel${i}`}  
                        images={unsplashImages}
                        apiName='Unsplash'
                        onDeleteBtnClick={onDeleteBtnClick}
                        updateQueue={updateQueue}
                    />);
            } else if (arrKeys[i] === 'pexels'){
                panelsToRender.push(
                    <Panel 
                        key={`${panels.pexels}panel${i}`}
                        images={pexelsImages}
                        apiName='Pexels'
                        onDeleteBtnClick={onDeleteBtnClick}
                        updateQueue={updateQueue}
                    />);
            } else if (arrKeys[i] === 'pixabay'){
                panelsToRender.push(
                    <Panel  
                        key={`${panels.pixabay}panel${i}`}    
                        images={pixabayImages} 
                        apiName='Pixabay'
                        onDeleteBtnClick={onDeleteBtnClick}
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
        <div className="loadingBackground">
            <div className="panelContainer">
                <div style={{display: 'flex', overflowX: 'auto', margin: '5px'}}>
                    {panelsToRender}
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
        </div>
    )
}

export default PanelContainer; 