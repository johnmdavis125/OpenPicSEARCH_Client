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
    const desiredResultsPerPage = 10; 
    const numPages = numImages / desiredResultsPerPage; 
    let filteredArray = []; 
    const filterImageArrayToCurrentPanelPage = (arrImages) => {
        const firstImageOnPage = desiredResultsPerPage * currentPage;
        const lastImageOnPage = firstImageOnPage + desiredResultsPerPage;
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
        <div className="panelMainDiv">
            <div className="upperDiv"><h5 className="panelTitle">{apiName}</h5></div>
            <div style={{display: 'flex'}}>

                <button onClick={decrementResults} disabled={leftButtonDisabled} className="prev" >&#8249;</button>

                <div style={{flexBasis: '90%'}} className="imagesContainer">{renderedImages}</div>        

                <button onClick={incrementResults} disabled={rightButtonDisabled} className="next">&#8250;</button>

                {/* <button onClick={incrementResults} disabled={rightButtonDisabled}>Right Arrow</button> */}
            </div>
        </div>
    )
}

export default Panel; 