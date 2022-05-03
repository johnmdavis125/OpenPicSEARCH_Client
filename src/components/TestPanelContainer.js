import React from 'react';
import Panel from './Panel'; 
import { useState, useRef } from 'react'; 

const TestPanelContainer = ({ unsplashImages, pexelsImages, pixabayImages }) => {
    
    const [panels, setPanels] = useState({
        pexels: 1,
        unsplash: 1,
        pixabay: 1
    }); 

    const onDeleteClick = (clickedPanel) => {
        console.log(`delete button clicked on panel: ${clickedPanel}`); 
        
        let setPanelsInput;
        let numPexelsPanels = panels.pexels; 
        let numUnsplashPanels = panels.unsplash;
        let numPixabayPanels = panels.pixabay;  
        if (clickedPanel === 'Pexels' && numPexelsPanels === 0){
            return; 
        } else if (clickedPanel === 'Pexels'){
            setPanelsInput = {
            pexels: numPexelsPanels - 1,
            unsplash: numUnsplashPanels,
            pixabay: numPixabayPanels
            }
        }

        if (clickedPanel === 'Unsplash' && numUnsplashPanels === 0){
            return;
        } else if (clickedPanel === 'Unsplash'){
            setPanelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels - 1,
                pixabay: numPixabayPanels
            }
        }
       
        if (clickedPanel === 'Pixabay' && numPixabayPanels === 0){
            return;
        } else if (clickedPanel === 'Pixabay'){
            setPanelsInput = {
                pexels: numPexelsPanels,
                unsplash: numUnsplashPanels,
                pixabay: numPixabayPanels - 1
            }
        }
        setPanels(setPanelsInput); 
    }
    
    let arrKeys = Object.keys(panels);
    console.log(`arrKeys: ${arrKeys}`); 
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

    console.log(`itemsToRender: ${itemsToRender}`); 

    return (
        <div>
            {itemsToRender}
        </div> 
    )
}

export default TestPanelContainer; 