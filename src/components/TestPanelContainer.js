import React from 'react';
import Panel from './Panel'; 
import { useState } from 'react'; 

const TestPanelContainer = ({ unsplashImages, pexelsImages, pixabayImages }) => {
    
    const [panels, setPanels] = useState({
        pexels: 1,
        unsplash: 1,
        pixabay: 1
    }); 
    
    let arrKeys = Object.keys(panels);
    console.log(`arrKeys: ${arrKeys}`); 
    let itemsToRender = []; 
    for (let i = 0; i < arrKeys.length; i++){
         for (let j = 0; j < panels[arrKeys[i]]; j++){
            if (arrKeys[i] === 'unsplash'){
                itemsToRender.push(<Panel images={unsplashImages} apiName='Unsplash' />);
            } else if (arrKeys[i] === 'pexels'){
                itemsToRender.push(<Panel images={pexelsImages} apiName='Pexels' />);
            } else if (arrKeys[i] === 'pixabay'){
                itemsToRender.push(<Panel images={pixabayImages} apiName='Pixabay' />);
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