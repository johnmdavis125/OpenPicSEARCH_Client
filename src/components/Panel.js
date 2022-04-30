import React from 'react';

const Panel = ({images, apiName}) => {
    
    const renderedImages = images.map((image) => {
        return (
            <div key={image.id} style={{border: "1px solid blue"}}>
                <img src={image.urls.small} />
            </div>
        )
    })

    return (
        <div>
            <div>{apiName} Panel</div>
            
            <div>
                {renderedImages}
            </div>
            
        </div>
    )
}

export default Panel; 