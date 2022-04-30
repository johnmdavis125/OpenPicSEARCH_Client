import React from 'react';

const PanelContainer = ({images}) => {
      
    const renderedImages = images.map((image) => {
        return (
            <div key={image.id} style={{border: "1px solid blue"}}>
                <img src={image.urls.small} />
            </div>
        )
    })
   
    return (
        <div style={{border: "1px solid red"}}>
            <div>Panel Container</div>

            <div>
                RenderedImages: {renderedImages}
            </div>
        </div>
    )
}

export default PanelContainer;