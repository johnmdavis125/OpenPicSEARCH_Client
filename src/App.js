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


const App = () => { 
    console.log('render app component');  

    const [mostRecentSearch, setMostRecentSearch] = useState('random'); 
    console.log(`mostRecentSearch: ${mostRecentSearch}`); 

    const [selectedResults, setSelectedResults] = useState([]); 

    const updateQueue = (image) => { 
        setSelectedResults([...selectedResults, image]); 
        checkForDuplicates(image); 
    }

    const checkForDuplicates = (image) => {
        if (selectedResults.includes(image)){
            console.log(`selectedResults includes ${image.id}`); 
            for (let i = 0; i < selectedResults.length; i++){
                console.log(selectedResults[i].id); 
            }
            console.log(`image is at index ${selectedResults.indexOf(image)}`);
            const indexOfDuplicate = selectedResults.indexOf(image); 
            
            console.log('run splice'); 
            const left = selectedResults.slice(0,indexOfDuplicate); 
            console.log('print left'); 
            for (let i = 0; i < left.length; i++){
                console.log(left[i].id); 
            }  
            const right = selectedResults.slice(indexOfDuplicate + 1); 
            console.log('print right'); 
            for (let i = 0; i < right.length; i++){
                console.log(right[i].id); 
            } 
            const newArr = [...left, ...right];  
            console.log('print newArr'); 
            for (let i = 0; i < newArr.length; i++){
                console.log(newArr[i].id); 
            } 
            
            setSelectedResults(newArr); 
        } else {
            console.log(`selectedResults does not include ${image.id}`); 
            for (let i = 0; i < selectedResults.length; i++){
                console.log(selectedResults[i].id); 
            } 
        }
    }

    const deselectFromQueue = (image) => {
        checkForDuplicates(image); 
    }

    const postCollection = (formattedInput) => {
          axios.post('http://localhost:3001/api/collections', formattedInput)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
          setSelectedResults([]);
      }; 

      const putCollection = async (formattedInput, colIDToUpdate) => {
        console.log('execute putCollection************'); 
        console.log(`formattedInput: ${formattedInput}`); 
        console.log(`colIDToUpdate: ${colIDToUpdate}`); 
        await axios.put(`http://localhost:3001/api/collections/${colIDToUpdate}`, formattedInput)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        setSelectedResults([]);
        }; 

    const createNewCollection = (unformattedImgArrForNewCol, colTitle) => {
        
        console.log('createNewCollection');
        console.log(`unformattedArr: ${unformattedImgArrForNewCol}`);
        console.log(`colTitle: ${colTitle}`);  
        
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
            } else {
                console.log('invalid image src'); 
            }
        })

        const formattedInput = {
            title: colTitle,
            images: formattedImgArr
        }
       
        postCollection(formattedInput); 
    }

    const [listCollections, setListCollections] = useState([]); 
    const [collection, setCollection] = useState({}); 
    const [collection4Update, setCollection4Update] = useState({}); 
   
    const combineInputsForPut = (imgArrParam, colTitleParam, colIDParam) => {
            console.log('execute combineInputsForPut inside the useEffect'); 
            console.log(`collection.title: ${collection4Update.title}`);
            console.log(`collection.images: ${collection4Update.images}`);
            console.log(`collection keys: ${Object.keys(collection4Update)}`);
            console.log(`imgArrParam: ${imgArrParam}`);
            let formattedInputImagesToAdd; 
            if (collection4Update.title && imgArrParam){
                formattedInputImagesToAdd = [...collection4Update.images, ...imgArrParam]; 
                console.log(`formattedInputImagesToAdd: ${formattedInputImagesToAdd}`); 
                    const formattedInput = {
                        title: colTitleParam,
                        images: formattedInputImagesToAdd
                    }
                    console.log(`formattedInput: ${Object.keys(formattedInput)}`); 
                    console.log(`formattedInput: ${formattedInput.title}`); 
                    console.log(`formattedInput: ${formattedInput.images}`); 
                    
                    for (let i = 0; i < formattedInput.images.length; i++){
                        console.log(formattedInput.images[i]); 
                    }
                    console.log(`colIDParam: ${colIDParam}`); 
                
                    putCollection(formattedInput, colIDParam);         
            } else {
                console.log('collection or globalFormattedImgArr not yet truthy');
            }
    }        
    
    const updateExistingCollection = (unformattedImgArrForUpdatingCol, colIDToUpdate, colToUpdateTitle) => {
        console.log('start updateExistingCollection execute'); 
        console.log(`update the ${colToUpdateTitle} collection - id: ${colIDToUpdate}`); 
        console.log(unformattedImgArrForUpdatingCol);

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
            } else {
                console.log('invalid image src'); 
            }
        })

        console.log(formattedImgArr); 
        combineInputsForPut(formattedImgArr, colToUpdateTitle, colIDToUpdate); 
    }      
    
    let useThisTargetIDTOCallUpdateExistingCollection; 
    let useThisTargetTitleTOCallUpdateExistingCollection; 
    const updateCollection = (event) => {
        const colToUpdateTitle = event; 
        console.log('updateCollection'); 
        console.log(colToUpdateTitle); 

        console.log(`selectedResults: ${selectedResults}`); 
    
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


    useEffect(() => {
        const triggerUpdate = () => {
            console.log('on first run of this useEffect, collection should be undefined'); 
            console.log(`collection.title: ${collection4Update.title}`)
            console.log(`selectedResults: ${selectedResults}`); 
            if (collection4Update.title){
                console.log(selectedResults); 
                updateExistingCollection(selectedResults, collection4Update._id, collection4Update.title); 
            } else {
                console.log('collection not yet truthy, cannot proceed to updateExistingCollection'); 
            }
        }
        triggerUpdate(); 
    }, [collection4Update]); 

    async function getCollection(collectionID) {
        try {
        console.log('run getCollection(colIDToUpdate)'); 
        const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
        console.log(`response: ${response}`);
        console.log(`response.data: ${response.data}`);
        setCollection(response.data); 
        } catch (error) {
        console.error(error);
        }
    }

    async function getCollection4Update(collectionID) {
        try {
        console.log('run getCollection(colIDToUpdate)'); 
        const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
        console.log(`response: ${response}`);
        console.log(`response.data: ${response.data}`);
        setCollection4Update(response.data); 
        } catch (error) {
        console.error(error);
        }
    }

    const deleteCollection = async (collectionID) => {
        try {
            console.log('deleteCollection execute'); 
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
                updateQueue={updateQueue}
                mostRecentSearch={mostRecentSearch}
                setMostRecentSearch={setMostRecentSearch}
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
