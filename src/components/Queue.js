import React from 'react';
import QueuePanel from './QueuePanel';

const Queue = ({ selectedResults, deselectFromQueue, createNewCollection, updateCollection }) => {

    console.log(`selectedResults.length in Queue: ${selectedResults.length}`);
 
    for (let i = 0; i < selectedResults.length; i++){
        console.log(selectedResults[i]); 
    }

    return (
        <div>
            <QueuePanel
                selectedResults={selectedResults}
                deselectFromQueue={deselectFromQueue}
                createNewCollection={createNewCollection}
                updateCollection={updateCollection}
                />
        </div>
    )
}

export default Queue; 