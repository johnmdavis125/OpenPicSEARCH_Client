import React from 'react'; 
import Header from './components/Header'; 
import Search from './components/Search';
import './App.css';

const App = () => {
    return (
    <div className="app">
        <Header /> 
        <Search />
    </div>
    )
}

export default App; 
