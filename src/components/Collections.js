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
    
    const renderedItems = data.map((item) => {
        return (
            <p key={item.imgURL}>{item.imgURL}</p>
        );
    });

    return (
        <div>
            <h3>Collections</h3>
            <Button onClick={getCollections} variant="primary">API Query</Button>

            <div>
                {renderedItems}
            </div>
        </div>
    )
}

export default Collections; 