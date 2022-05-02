import React from 'react';
import Panel from './Panel'; 

const PanelContainer = ({unsplashImages}) => {   
    return (
        <div>
            <Panel images={unsplashImages} apiName="Unsplash"/> 
        </div>
    )
}

export default PanelContainer;