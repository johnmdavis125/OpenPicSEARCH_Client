import React from 'react';
import { useState } from 'react';
import axios from 'axios'; 
import SearchBar from './SearchBar';
import PanelContainer from './PanelContainer';
import TestPanelContainer from './TestPanelContainer';
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;     

const Search = () => {
    const [unsplashImages, setUnsplashImages] = useState([]); 
    const [pexelsImages, setPexelsImages] = useState([{urls: {regular: 'pexelsValue1'}}]); 
    const [pixabayImages, setPixabayImages] = useState([{urls: { regular: 'pixabayValue1'}}]); 

    async function searchUnsplash(searchTerm) {
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { 
                query: searchTerm,
                per_page: 30
            },  
            headers: {
                  Authorization: `Client-ID ${UNSPLASH_KEY}`
              }
          });
          setUnsplashImages(response.data.results); 
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div>
            <SearchBar onSubmit={searchUnsplash} label={null} placeholder="Enter Search Term..." btnText="Search" altText="All images sourced from public domain/open license databases. Enjoy :)" />
            {/* <PanelContainer 
                unsplashImages={unsplashImages}
                pexelsImages={pexelsImages}
                pixabayImages={pixabayImages}
            /> */}
            <TestPanelContainer 
                unsplashImages={unsplashImages}
                pexelsImages={pexelsImages}
                pixabayImages={pixabayImages} 
            />
        </div>
    )
}

export default Search; 