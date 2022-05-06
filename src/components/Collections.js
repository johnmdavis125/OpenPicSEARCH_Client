import React from 'react'; 
import { useState } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';
import CollectionsPanel from './CollectionsPanel'; 

const Collections = () => {
    
    // const [data, setData] = useState([]); 
    const [listCollections, setListCollections] = useState([]); 
    const [collection, setCollection] = useState({}); 
    

    async function getCollections() {
        try {
          const response = await axios.get('http://localhost:3001/api/collections');
          console.log(response);
          console.log(response.data);
          setListCollections(response.data); 
        } catch (error) {
          console.error(error);
        }
      }

      async function getCollection(collectionID) {
        try {
          const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
          console.log(response);
          console.log(response.data);
          setCollection(response.data); 
        } catch (error) {
          console.error(error);
        }
      }
    
    const renderedCollectionsList = listCollections.map((col) => {
        return (
            <Button 
                key={col._id}
                onClick={() => getCollection(col._id)}
            >{col.title}</Button>
        );
    });

    let renderedImages; 
    Object.keys(collection).length > 0 ? 
    renderedImages = collection.images.map((image) => {
        return (
            <img key={image.id} src={image.imgSrc} />
        )}) 
    : renderedImages = []; 

    // Logic -> Index => 'get' number of collections (hard coded for now) and their titles -> labels on the buttons
        // getCollections    
    // clickButton -> another 'get' of that specific collection -> display in panel
    return (
        <div className='collectionsMain'>
            <div className='collectionsInner'>
                <div>
                    <Button onClick={getCollections} variant="primary">INDEX_ShowAllCollections</Button>
                </div>
                <div>
                    {renderedCollectionsList}
                </div>
            </div>
            <CollectionsPanel collectionImages={collection} /> 
        </div>
    )
}

export default Collections; 