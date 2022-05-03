import React from 'react';
import { useState, useEffect, useRef } from 'react'; 
import ImageCard from './ImageCard';
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


    const renderedImages = filteredArray.map((image) => {       
        return (
            <ImageCard key={image.id} image={image} />
        )
    })

    // const ref = useRef(); 
    // useEffect(() => {
    //     ref.current.addEventListener('click', () => {
    //         // console.log(event.target.value);
    //         console.log(ref.current);  
    //         onDeleteClick(ref.current);
    //     }) 
    // },[]);

    // const [panelToDelete, setPanelToDelete] = useState({}); 
    
    const deleteClickHelper = () => {
        // setPanelToDelete(event.target);
        // console.log(event.target);  
        
        onDeleteClick(apiName); 
    }
    
    // useEffect(() => {
    //     const panelToDelete = document.querySelector('.closeButton'); 
    //     panelToDelete.addEventListener('click', (event) => {
    //         console.log(panelToDelete); 
    //         console.log(event.target.value); 
    //     }); 
    // },[]);

    return (
        <div className="panelMainDiv">
            <div className="upperDiv">
                <h5 className="panelTitle" style={{paddingLeft: '15px'}}>{apiName}</h5>
                <CloseButton onClick={deleteClickHelper} className="closeButton" style={{color: 'white', opacity: '0.5', paddingRight: '15px'}} variant='white'></CloseButton>
                
                {/* <button style={{color: 'white', padding: '0 15px 0 15px', border: 'none', fontSize: '15px', backgroundColor: 'rgba(0,0,0,0.7)'}}>x</button> */}
            </div>
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