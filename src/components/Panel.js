import React from 'react';
import { useState, useEffect, useRef } from 'react'; 
import ImageCardUnsplash from './ImageCardUnsplash';
import ImageCardPexels from './ImageCardPexels';
import ImageCardPixabay from './ImageCardPixabay';
import CloseButton from 'react-bootstrap/CloseButton';
import "./Panel.css";

const Panel = ({images, apiName, onDeleteClick}) => {

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

    let renderedImages;
    if (apiName === 'Unsplash'){
        renderedImages = filteredArray.map((image) => {       
            console.log(`unsplash: ${Object.keys(image)}`);
            return (
                <ImageCardUnsplash key={image.id} image={image} />
            )
        });
    } else if (apiName === 'Pexels'){
        renderedImages = filteredArray.map((image) => {       
            console.log(`pexels: ${Object.keys(image)}`);
            return (
                <ImageCardPexels key={image.id} image={image} />
            )
        });        
    } else if (apiName === 'Pixabay') {
        renderedImages = filteredArray.map((image) => {
            console.log(`pixabay: ${Object.keys(image)}`);
            return (
                <ImageCardPixabay key={image.id} image={image} />
            )
        });
    } else {
        console.log('invalid apiName');
    }
    
    const deleteClickHelper = () => {       
        onDeleteClick(apiName); 
    }
    
    return (
        <div className="panelMainDiv">
            <div className="upperDiv">
                <h5 className="panelTitle" style={{paddingLeft: '15px'}}>{apiName}</h5>
                <CloseButton onClick={deleteClickHelper} className="closeButton" style={{color: 'white', opacity: '0.5', paddingRight: '15px'}} variant='white'></CloseButton>
                
            </div>
            <div style={{display: 'flex'}}>

                <button onClick={decrementResults} disabled={leftButtonDisabled} className="prev" >&#8249;</button>

                <div style={{flexBasis: '90%'}} className="imagesContainer">{renderedImages}</div>        

                <button onClick={incrementResults} disabled={rightButtonDisabled} className="next">&#8250;</button>
            </div>
        </div>
    )
}

export default Panel; 