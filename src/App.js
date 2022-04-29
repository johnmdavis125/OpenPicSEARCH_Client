import React from 'react'; 
import Header from './components/Header'; 
import Search from './components/Search';

const App = () => {
    return (
    <div>
        <Header /> 
        <Search label={null} placeholder="Enter Search Term..." btnText="Search" altText="All images sourced from public domain/open license databases. Enjoy :)" />
    </div>
    )
}

export default App; 
