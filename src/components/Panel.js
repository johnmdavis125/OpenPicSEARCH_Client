import React from 'react';
import { useState } from 'react'; 
import ImageCard from './ImageCard';
import "./Panel.css";

const Panel = ({images, apiName}) => {
    
    const [currentPage, setCurrentPage] = useState(0);
    
    const incrementResults = () => {
        setCurrentPage(currentPage + 1);
    }    
    const decrementResults = () => {
        setCurrentPage(currentPage - 1);
    }
    
    const numImages = images.length; 
    const resultsPerPage = 10; 
    const numPages = numImages / resultsPerPage; 
    let filteredArray = []; 
    const filterImageArrayToCurrentPanelPage = (arrImages) => {
        const firstImageOnPage = resultsPerPage * currentPage;
        const lastImageOnPage = firstImageOnPage + resultsPerPage;
        filteredArray = arrImages.slice(firstImageOnPage, lastImageOnPage); 
        return filteredArray; 
    }
 
    if (numImages){
        filterImageArrayToCurrentPanelPage(images); 
    }

    let rightButtonDisabled = false;
    if (currentPage === numPages - 1){rightButtonDisabled = true;}
    let leftButtonDisabled = false; 
    if (currentPage === 0){leftButtonDisabled = true;}

    
    const renderedImages = filteredArray.map((image) => {       
        return (
            <ImageCard key={image.id} image={image} />
        )
    })

    return (
        <div>
            <div>{apiName} Panel</div>
            <button onClick={decrementResults} disabled={leftButtonDisabled}>Left Arrow</button>
            <div className="imagesContainer">{renderedImages}</div>        
            <button onClick={incrementResults} disabled={rightButtonDisabled}>Right Arrow</button>
        </div>
    )
}

export default Panel; 