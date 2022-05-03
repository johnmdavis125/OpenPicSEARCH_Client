import React from 'react';
import Panel from './Panel'; 
import { useState } from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';

const PanelContainer = ({ unsplashImages, pexelsImages, pixabayImages }) => {
    
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
                itemsToRender.push(<Panel images={unsplashImages} apiName='Unsplash' onDeleteClick={onDeleteClick} />);
            } else if (arrKeys[i] === 'pexels'){
                itemsToRender.push(<Panel images={pexelsImages} apiName='Pexels' onDeleteClick={onDeleteClick} />);
            } else if (arrKeys[i] === 'pixabay'){
                itemsToRender.push(<Panel images={pixabayImages} apiName='Pixabay' onDeleteClick={onDeleteClick} />);
            } else {
                console.log('illegitimate key, initiate debug'); 
            }
         }
    }       

    return (
        <div>
            <div>{itemsToRender}</div>
            <Dropdown onSelect={onAddPanelDropdownClick}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={dropdownDisabled}>
                    Add Panel
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="pexels">Pexels</Dropdown.Item>
                    <Dropdown.Item eventKey="unsplash">Unsplash</Dropdown.Item>
                    <Dropdown.Item eventKey="pixabay">Pixabay</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div> 
    )
}

export default PanelContainer; 