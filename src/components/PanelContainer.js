import React from 'react';
import { useState } from 'react'; 
import Panel from './Panel'; 

const PanelContainer = ({unsplashImages, pexelsImages, pixabayImages}) => {   
    
    // initialize state object -> says how many of each panel type to render
    // ensures no more than 3 panels displayed total
    // delete button -> updateState
    // add panel -> disable if there are already 3 panels
    // conditionally render 1-3 panel components from state object


    // const [panels, setPanels] = useState({
    //     pexels: 1,
    //     unsplash: 1,
    //     pixabay: 1
    // }); 

    // if panels.pexels === 1 && panels.unsplash === 1 && panels.pixabay === 1 => return 
    // -
    // for (each source){
        //  for (this many times for this source){
            // itemsToRender.push(<component props={}/>);
    //}      
    //}

    // test the logic with simple components & text**
    

    return (
        <div>
            <Panel images={unsplashImages} apiName="Unsplash"/> 
        </div>
    )
}

export default PanelContainer;