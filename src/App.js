import React from 'react'; 
import { useState, useEffect } from 'react';
import Route from './components/Route';
import Header from './components/Header'; 
import Search from './components/Search';
import Queue from './components/Queue'; 
import Collections from './components/Collections'; 
import About from './components/About'; 
import './components/componentStyles/App.css';
import { updateQueueLinkUserFeedback } from './components/utils/utilMethods.mjs'; 

const App = () => { 

    const [mostRecentSearch, setMostRecentSearch] = useState('random'); 
    const [selectedResults, setSelectedResults] = useState([]); 
    const [listCollections, setListCollections] = useState([]); 

    const deselectFromQueue = (image) => {
        if (selectedResults.includes(image)){
            const indexToRemove = selectedResults.indexOf(image); 
            const left = selectedResults.slice(0,indexToRemove); 
            const right = selectedResults.slice(indexToRemove + 1); 
            const newArr = [...left, ...right];  
            setSelectedResults(newArr); 
        }
    }

    const updateQueue = (image) => {
        if (selectedResults.includes(image)){
            deselectFromQueue(image); 
        } else {
            setSelectedResults([...selectedResults, image]); 
        }
    }
    
useEffect(() => {
  updateQueueLinkUserFeedback(selectedResults); 
},[selectedResults]);
    
    
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
                setSelectedResults={setSelectedResults}
                deselectFromQueue={deselectFromQueue}
                setListCollections={setListCollections}
                listCollections={listCollections}
            />
        </Route>
        <Route path="/collections">
            <Collections 
                listCollections={listCollections}
                setListCollections={setListCollections}
            />
        </Route>
    </div>
    )
}

export default App; 
