import React from 'react';
import { useState, useEffect } from 'react';
// import ToastContainer from 'react-bootstrap/ToastContainer'; 
// import Toast from 'react-bootstrap/Toast'; 
import CustomToast from './CustomToast';
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
            console.log(searchTerm); 
            searchUnsplash(searchTerm);
            searchPexels(searchTerm);
            searchPixabay(searchTerm);
        } else {
            console.log('invalid search term');
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