import React, { useEffect } from 'react'; 
import { useState } from 'react';
import axios from 'axios'; 
import Route from './components/Route';
import Header from './components/Header'; 
import Search from './components/Search';
import Queue from './components/Queue'; 
import Collections from './components/Collections'; 
import About from './components/About'; 
import './components/componentStyles/App.css';
// import myFunc from './components/utils/utilMethods.mjs';

const App = () => { 
// SEARCH -> Props = mostRecentSearch, setMostRecentSearch, updateQueue
    // State
    const [mostRecentSearch, setMostRecentSearch] = useState('random'); 
    const [selectedResults, setSelectedResults] = useState([]); 
    // Ftns
    const deselectFromQueue = (image) => {
        if (selectedResults.includes(image)){
            const indexToRemove = selectedResults.indexOf(image); 
            const left = selectedResults.slice(0,indexToRemove); 
            const right = selectedResults.slice(indexToRemove + 1); 
            const newArr = [...left, ...right];  
            setSelectedResults(newArr); 
        } else {
            console.log('image not present in selected results...weird'); 
        }
    }
    const updateQueue = (image) => {
        if (selectedResults.includes(image)){
            deselectFromQueue(image); 
        } else {
            setSelectedResults([...selectedResults, image]); 
        }
    }
    
    // QUEUE -> Props = selectedResults, deselectFromQueue, createNewCollection, updateCollection, setListCollections, listCollections
    // State
    const [collection, setCollection] = useState({}); 
    const [listCollections, setListCollections] = useState([]); 
    const [collection4Update, setCollection4Update] = useState({}); 
    // Ftns
    const postCollection = (formattedInput) => {
        axios.post('http://localhost:3001/api/collections', formattedInput)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
        setSelectedResults([]);
    }; 
    
    const createNewCollection = (unformattedImgArrForNewCol, colTitle) => {
        let formattedImgArr = unformattedImgArrForNewCol.map((image) => {
            if (image.hasOwnProperty('urls')){
                return ({
                    imgSrc: image.urls.regular,
                    description: image.description,
                    photographer: image.user.name,
                    portfolioURL: image.user.links.portfolio,
                    apiName: 'Unsplash',
                    apiID: image.id
                });
            } else if (image.hasOwnProperty('src')){
                return ({
                    imgSrc: image.src.medium, 
                    description: image.alt,
                    photographer: image.photographer,
                    portfolioURL: image.photographer.url,
                    apiName: 'Pexels',
                    apiID: image.id
                });
            } else if (image.hasOwnProperty('webformatURL')){
                return ({
                    imgSrc: image.webformatURL, 
                    description: image.tags,
                    photographer: image.user,
                    portfolioURL: image.userImageURL,
                    apiName: 'Pixabay',
                    apiID: image.id
                });
            }
        })
        
        const formattedInput = {
            title: colTitle,
            images: formattedImgArr
        }
        
        postCollection(formattedInput); 
    }

    async function getCollection4Update(collectionID) {
        try {
        const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
        setCollection4Update(response.data); 
        } catch (error) {
        console.error(error);
        }
    }
    let useThisTargetIDTOCallUpdateExistingCollection; 
    let useThisTargetTitleTOCallUpdateExistingCollection; 
    const updateCollection = (event) => {
        const colToUpdateTitle = event; 
    
        let targetID;
        // rename -> not an arrayContainingTargetIDs...
        const arrContainingTargetIDs = listCollections.map((col) => {
            if (col.title === colToUpdateTitle){
              targetID = col._id;   
            }
            console.log(`targetID: ${targetID}`);
            return targetID; 
        });
        console.log(`arrContainingTargetIDs: ${arrContainingTargetIDs}`); 
    
        for (let i = 0; i < listCollections.length; i++){
            if (listCollections[i]._id === targetID){
                let targetIndex = i; 
                console.log(`listCollections[targetIndex].title: ${listCollections[targetIndex].title}`);   
                console.log(`listCollections[targetIndex]._id: ${listCollections[targetIndex]._id}`);   
            }
        }
        console.log(`targetID: ${targetID}`); 
        useThisTargetIDTOCallUpdateExistingCollection = targetID; 
        console.log(`useThisTargetIDTO: ${useThisTargetIDTOCallUpdateExistingCollection}`); 
         
        console.log(`colToUpdateTitle: ${colToUpdateTitle}`); 
        useThisTargetTitleTOCallUpdateExistingCollection = colToUpdateTitle;
        console.log(`useThisTargetTitleTO: ${useThisTargetTitleTOCallUpdateExistingCollection}`); 

        console.log(`*******selectedResults: ${selectedResults}`); 

        getCollection4Update(targetID); 
    }
    
    const putCollection = async (formattedInput, colIDToUpdate) => {
        await axios.put(`http://localhost:3001/api/collections/${colIDToUpdate}`, formattedInput)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
        setSelectedResults([]);
    }; 
    
    const combineInputsForPut = (imgArrParam, colTitleParam, colIDParam) => {
        let formattedInputImagesToAdd; 
        if (collection4Update.title && imgArrParam){
            formattedInputImagesToAdd = [...collection4Update.images, ...imgArrParam]; 
            const formattedInput = {
                title: colTitleParam,
                images: formattedInputImagesToAdd
            }
            putCollection(formattedInput, colIDParam);         
        }
    }        
    
    const updateExistingCollection = (unformattedImgArrForUpdatingCol, colIDToUpdate, colToUpdateTitle) => {
        let formattedImgArr = selectedResults.map((image) => {
            if (image.hasOwnProperty('urls')){
                return ({
                    imgSrc: image.urls.regular,
                    description: image.description,
                    photographer: image.user.name,
                    portfolioURL: image.user.links.portfolio,
                    apiName: 'Unsplash',
                    apiID: image.id
                });
            } else if (image.hasOwnProperty('src')){
                return ({
                    imgSrc: image.src.medium, 
                    description: image.alt,
                    photographer: image.photographer,
                    portfolioURL: image.photographer.url,
                    apiName: 'Pexels',
                    apiID: image.id
                });
            } else if (image.hasOwnProperty('webformatURL')){
                return ({
                    imgSrc: image.webformatURL, 
                    description: image.tags,
                    photographer: image.user,
                    portfolioURL: image.userImageURL,
                    apiName: 'Pixabay',
                    apiID: image.id
                });
            }
        })
        combineInputsForPut(formattedImgArr, colToUpdateTitle, colIDToUpdate); 
    }      
    
    useEffect(() => {
        const triggerUpdate = () => {
            if (collection4Update.title){
                updateExistingCollection(selectedResults, collection4Update._id, collection4Update.title); 
            }
        }
        triggerUpdate(); 
    }, [collection4Update]); 
    
    async function getCollection(collectionID) {
        try {
            const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
            setCollection(response.data); 
        } catch (error) {
            console.error(error);
        }
    }
    
    // COLLECTIONS -> Props: listCollections, setListCollections, getCollection, collection, setCollection, deleteCollection
    const deleteCollection = async (collectionID) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/collections/${collectionID}`); 
            console.log(response); 
        } catch (error) {
            console.error(error); 
        }
    }
    
    return (
        <div className="app">
        <Header />
        <Route path="/">
            <Search
                mostRecentSearch={mostRecentSearch}
                setMostRecentSearch={setMostRecentSearch}
                updateQueue={updateQueue}
            />
        </Route>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/queue">
            <Queue
                selectedResults={selectedResults}
                deselectFromQueue={deselectFromQueue}
                createNewCollection={createNewCollection} 
                updateCollection={updateCollection}
                setListCollections={setListCollections}
                listCollections={listCollections}
            />
        </Route>
        <Route path="/collections">
            <Collections 
                listCollections={listCollections}
                setListCollections={setListCollections}
                getCollection={getCollection}
                collection={collection}
                setCollection={setCollection}
                deleteCollection={deleteCollection}
            />
        </Route>
    </div>
    )
}

export default App; 
