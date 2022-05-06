import React from 'react'; 
import { useState } from 'react';
import axios from 'axios'; 
import Route from './components/Route';
import Header from './components/Header'; 
import Search from './components/Search';
import Queue from './components/Queue'; 
import Collections from './components/Collections'; 
import About from './components/About'; 
import './App.css';

const App = () => {
    
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

    const updateCollection = () => {
        console.log('updateCollection'); 
    }

    return (
    <div className="app">
        <Header />
        <Route path="/">
            <Search updateQueue={updateQueue}/>
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
            />
        </Route>
        <Route path="/collections">
            <Collections />
        </Route>
    </div>
    )
}

export default App; 
