import React from 'react';
import QueuePanel from './QueuePanel';

const Queue = ({ selectedResults }) => {

    console.log(`selectedResults.length in Queue: ${selectedResults.length}`);
 
    for (let i = 0; i < selectedResults.length; i++){
        console.log(selectedResults[i]); 
    }

    return (
        <div>
            <QueuePanel selectedResults={selectedResults} />
        </div>
    )
}

export default Queue; 