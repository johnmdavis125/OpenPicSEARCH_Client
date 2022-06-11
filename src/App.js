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
import formatImgArray from './components/utils/utilMethods.mjs';

const App = () => { 
    const [mostRecentSearch, setMostRecentSearch] = useState('random'); 
    const [selectedResults, setSelectedResults] = useState([]); 

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
    
    const [collection, setCollection] = useState({}); 
    const [listCollections, setListCollections] = useState([]); 
    const [collection4Update, setCollection4Update] = useState({}); 
    
    const createNewCollection = (unformattedImgArrForNewCol, colTitle) => {
        let formattedInput = formatImgArray(unformattedImgArrForNewCol, colTitle); 
        
        axios.post('http://localhost:3001/api/collections', formattedInput)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
        setSelectedResults([]);
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
    
    const updateExistingCollection = async (unformattedImgArrForUpdatingCol, colIDToUpdate, colToUpdateTitle) => {
        let newImages = formatImgArray(unformattedImgArrForUpdatingCol, colToUpdateTitle).images; 
        let existingImages = collection4Update.images; 
        let updatedImgArray = [...existingImages, ...newImages]; 
            
        const formattedInput = {
            title: colToUpdateTitle,
            images: updatedImgArray
        }
        
        await axios.put(`http://localhost:3001/api/collections/${colIDToUpdate}`, formattedInput)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
        setSelectedResults([]);    
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
