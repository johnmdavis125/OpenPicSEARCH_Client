import React from 'react';
import { useState } from 'react'; 
import ImageCard from './ImageCard';
import CloseButton from 'react-bootstrap/CloseButton';
import "./componentStyles/Panel.css";

const Panel = ({images, apiName, onDeleteBtnClick, updateQueue }) => {
    
    // Pagination
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
    
    // Pass filtered results into ImageCard
    let renderedImages;
    renderedImages = filteredArray.map((image) => {
        return (
            <ImageCard
                key={image.id}
                image={image}
                apiName={apiName}
                updateQueue={updateQueue}
            />
        )
    });

    // Delete Button
    const deleteClickHelper = () => {       
        onDeleteBtnClick(apiName); 
    }

    return (
            <div className="panelMainDiv">
                <div className="upperDiv">
                    <h5 className="panelTitle" style={{paddingLeft: '15px'}}>{apiName}</h5>
                    <CloseButton 
                        onClick={deleteClickHelper} 
                        className="closeButton" 
                        style={{color: 'white', opacity: '0.5', paddingRight: '15px'}} 
                        variant='white'>
                    </CloseButton>
                </div>
                <div className="lowerDiv" style={{display: 'flex'}}>
                    <button
                        onClick={decrementResults}
                        disabled={leftButtonDisabled}
                        className="prev">&#8249;
                    </button>

                    <div style={{flexBasis: '90%'}} className="imagesContainer">
                        {renderedImages}
                    </div>        

                    <button 
                        onClick={incrementResults}
                        disabled={rightButtonDisabled}
                        className="next">&#8250;
                    </button>
                </div>
            </div>
    )
}

export default Panel; 