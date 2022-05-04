import React from 'react'; 
import Route from './components/Route';
import Header from './components/Header'; 
import Search from './components/Search';
import Queue from './components/Queue'; 
import Collections from './components/Collections'; 
import About from './components/About'; 

import './App.css';

const App = () => {
    return (
    <div className="app">
        <Header />
        <Route path="/">
            <Search />
        </Route>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/queue">
            <Queue />
        </Route>
        <Route path="/collections">
            <Collections />
        </Route>
    </div>
    )
}

export default App; 
