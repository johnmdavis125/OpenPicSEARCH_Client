import React from 'react';
import { useState, useEffect } from 'react';
import CustomToast from './CustomToast';
import axios from 'axios'; 
import SearchBar from './SearchBar';
import PanelContainer from './PanelContainer';
import './componentStyles/Search.css';
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;  
const PEXELS_KEY = process.env.REACT_APP_PEXELS_API_KEY;   
const PIXABAY_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

const Search = ({ mostRecentSearch, setMostRecentSearch, updateQueue }) => {
    const [unsplashImages, setUnsplashImages] = useState([]); 
    const [pexelsImages, setPexelsImages] = useState([]); 
    const [pixabayImages, setPixabayImages] = useState([]); 

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

    const [emptySearchToast, setEmptySearchToast] = useState(false); 
    const toggleEmptySearchToast = () => {
        setEmptySearchToast(!emptySearchToast); 
    }

    const runAPISearch = (searchTerm) => {
        if (searchTerm){
            searchUnsplash(searchTerm);
            searchPexels(searchTerm);
            searchPixabay(searchTerm);
        } else {
            toggleEmptySearchToast();  
        }
    }

    useEffect(() => {
        if (mostRecentSearch){
            runAPISearch(mostRecentSearch);
        }
    },[mostRecentSearch]);

    const runBrowserSearch = () => {
        console.log('run browser search'); 
    }

    return (
        <div className="Search">
            <SearchBar
                onSubmit={runAPISearch}
                setMostRecentSearch={setMostRecentSearch}
                onSelect={runBrowserSearch}
            />
            <CustomToast 
                emptySearchToast={emptySearchToast}
                toggleEmptySearchToast={toggleEmptySearchToast}
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