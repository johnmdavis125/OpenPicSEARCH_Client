import React from 'react'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import CollectionsPanel from './CollectionsPanel'; 

const Collections = ({ setLabelsForUpdateBtn, listCollections, setListCollections, getCollection, collection, setCollection, deleteCollection}) => {
    
    console.log('render collections component');    

    useEffect(() => {
        async function updateCollections() {
            try {
            const response = await axios.get('http://localhost:3001/api/collections');
            console.log(response);
            console.log(response.data);
            setListCollections(response.data); 
        } catch (error) {
            console.error(error);
        }
    }
    updateCollections(); 
    },[]);  
    
    // Prep To Render
    const renderedCollectionsList = listCollections.map((col) => {
        return (
            <Button 
                key={col._id}
                className='listBtn'
                onClick={() => getCollection(col._id)}
            >{col.title}</Button>
        );
    });
    let renderedImages; 
    Object.keys(collection).length > 0 ? 
    renderedImages = collection.images.map((image) => {
        return (
            <img key={image.id} src={image.imgSrc} />
        )}) 
    : renderedImages = []; 

    return (
        <div className='collectionsMain'>
            <CollectionsPanel collection={collection} setCollection={setCollection} renderedCollectionsList={renderedCollectionsList} deleteCollection={deleteCollection} /> 
        </div>
    )
}

export default Collections; 