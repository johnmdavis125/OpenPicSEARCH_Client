import React from 'react'; 
import { useState } from 'react';
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
        console.log('add image to queue');
        console.log(image); 
        
        setSelectedResults([...selectedResults, image]); 
        console.log(`selectedResults.length: ${selectedResults.length}`)  
    }

    console.log(`selectedResults.length in App comp: ${selectedResults.length}`);

    for (let i = 0; i < selectedResults.length; i++){
        console.log(selectedResults[i]); 
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
            <Queue selectedResults={selectedResults}/>
        </Route>
        <Route path="/collections">
            <Collections />
        </Route>
    </div>
    )
}

export default App; 
