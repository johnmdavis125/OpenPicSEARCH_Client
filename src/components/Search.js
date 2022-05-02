import React from 'react';
import { useState } from 'react';
import axios from 'axios'; 
import SearchBar from './SearchBar';
import PanelContainer from './PanelContainer';
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;     

const Search = () => {
    const [unsplashImages, setUnsplashImages] = useState([]); 

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
            <PanelContainer unsplashImages={unsplashImages}/>
        </div>
    )
}

export default Search; 