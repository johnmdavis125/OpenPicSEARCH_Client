import React from 'react';
import Panel from './Panel'; 

const PanelContainer = ({unsplashImages}) => {   
    return (
        <div style={{border: "1px solid red"}}>
            <div>Panel Container</div>

        <Panel images={unsplashImages} apiName="Unsplash"/> 
        </div>
    )
}

export default PanelContainer;