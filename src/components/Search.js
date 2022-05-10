import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import InputBar from './InputBar';
import PanelContainer from './PanelContainer';
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;  
const PEXELS_KEY = process.env.REACT_APP_PEXELS_API_KEY;   
const PIXABAY_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

const Search = ({ updateQueue, mostRecentSearch, setMostRecentSearch }) => {
    const [unsplashImages, setUnsplashImages] = useState([]); 
    const [pexelsImages, setPexelsImages] = useState([]); 
    const [pixabayImages, setPixabayImages] = useState([]); 
    // create placeholder images -> initiatlize state with a starter image in each panel

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

    async function searchPexels(searchTerm) {
        try {
            const response = await axios.get('https://api.pexels.com/v1/search', {
                params: {
                    query: searchTerm,
                    per_page: 30
                },
                headers: {
                    Authorization: PEXELS_KEY
                }
            }); 
            setPexelsImages(response.data.photos);
        } catch (error) {
            console.error(error); 
        }
    }

    async function searchPixabay(searchTerm) {
        try {
            const pixabayBaseURL = 'https://pixabay.com/api/'
            const pixabayURL = `${pixabayBaseURL}?key=${PIXABAY_KEY}&q=${encodeURIComponent(searchTerm)}`;
            const response = await axios.get(pixabayURL, {
                params: {
                    per_page: 30
                }
            }); 
            setPixabayImages(response.data.hits); 
        } catch (error) {
            console.error(error);
        }
    }

    const runAPISearch = (searchTerm) => {
        searchUnsplash(searchTerm);
        searchPexels(searchTerm);
        searchPixabay(searchTerm);
    }

    
    useEffect(() => {
        runAPISearch(mostRecentSearch); 
    },[mostRecentSearch]);

    const runBrowserSearch = () => {
        console.log('run browser search'); 
    }

    const dropDownConfig = {
        onSelect: runBrowserSearch,
        btnLabel: 'Search in Browser',
        customOptions: ['Search site', 'Search site2', 'Search site3', 'Search All'],
        dropDownDisabled: false,
        eventKeys: ['site1', 'site2', 'site3', 'all']
    }

    return (
        <div>
            <InputBar 
                onSubmit={runAPISearch}
                label={null} 
                placeholder="Enter Search Term..." 
                defaultTerm="random"
                mostRecentSearch={mostRecentSearch}
                setMostRecentSearch={setMostRecentSearch}
                btn1Text="Search" 
                btn2Text="Search in Browser" 
                altText="All images sourced from public domain/open license databases. Enjoy :)"
                dropDownConfig={dropDownConfig} 
            />
            <PanelContainer 
                unsplashImages={unsplashImages}
                pexelsImages={pexelsImages}
                pixabayImages={pixabayImages} 
                updateQueue={updateQueue}
            />
        </div>
    )
}

export default Search; 