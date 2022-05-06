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

    console.log(`selectedResults.length in App comp: ${selectedResults.length}`);
    for (let i = 0; i < selectedResults.length; i++){
        console.log(selectedResults[i]); 
    }

    const deselectFromQueue = (image) => {
        console.log('deselect from Queue run');
        checkForDuplicates(image); 
    }

    const postCollection = (imgArrayForNewCollection) => {
          axios.post('http://localhost:3001/api/collections', imgArrayForNewCollection)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
      }; 

    const createNewCollection = (imgArrayForNewCollection) => {
        console.log('createNewCollection');
        console.log(imgArrayForNewCollection); 
        
        // massage data on this line to follow model schema & pass to postCollection
            // need to fix model schema as well?

        postCollection(imgArrayForNewCollection); 
    }

    const updateCollection = () => {
        console.log('updateCollection'); 
    }

    return (
    <div className="app">
        <Header />
        <Route path="/search">
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
