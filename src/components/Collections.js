import React from 'react'; 
import { useState } from 'react'; 
import axios from 'axios'; 
import Button from 'react-bootstrap/Button';

const Collections = () => {
    
    const [data, setData] = useState([]); 
 
    async function getCollections() {
        try {
          const response = await axios.get('http://localhost:3001/api/collections');
          console.log(response);
          console.log(response.data);
          setData(response.data); 
        } catch (error) {
          console.error(error);
        }
      }

      async function getCollection(collectionID) {
        try {
          const response = await axios.get(`http://localhost:3001/api/collections/${collectionID}`);
          console.log(response);
          console.log(response.data);
          setData(response.data); 
        } catch (error) {
          console.error(error);
        }
      }
    
      // item.imgURL is not valid here...item is an array
      // double check that item._id is a unique value here
    const renderedCollections = data.map((item) => {
        return (
            <p key={item._id}>{item.imgURL}</p>
        );
    });

    // Logic -> Index => 'get' number of collections (hard coded for now) and their titles -> labels on the buttons
        // getCollections    
    // clickButton -> another 'get' of that specific collection -> display in panel

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>Collections</h3>
            <div>
                <Button onClick={getCollections} variant="primary">INDEX_ShowAllCollections</Button>
                <Button onClick={() => getCollection('collection1_id')} variant="primary">See Collection 1</Button>
                <Button onClick={() => getCollection('collection2_id')} variant="primary">See Collection 2</Button>
                <Button onClick={() => getCollection('collection3_id')} variant="primary">See Collection 3</Button>
            </div>
            <div className='collectionPanel_should_be_this_div_instead_of_plain_div***'>
                {renderedCollections} 
                {/* this panel will show one collection at a time, not multiple as currently indicated */}
            </div>
        </div>
    )
}

export default Collections; 