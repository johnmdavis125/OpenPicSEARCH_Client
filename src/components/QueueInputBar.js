import React from 'react';
import { useState } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomDropDown from './CustomDropdown';
import './componentStyles/QueueInputBar.css';

const QueueInputBar = ({ onSubmit, onSelect, customOptions, eventKeys }) => {
    
    const [term, setTerm] = useState(''); 

    const onFormSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(term);  
    }
    
    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="m-3" style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: 'flex', maxWidth: '1000px'}}>
                    <Form.Control
                        type="text"
                        placeholder="Enter Title of Your New Collection..."
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        />
                    <Button variant="success" type="submit" style={{minWidth: '150px'}}>
                        New Collection
                    </Button>
                    <CustomDropDown 
                        onSelect={onSelect}
                        btnLabel="Add to Existing Collection" 
                        customOptions={customOptions}
                        dropdownDisabled={false}
                        eventKeys={eventKeys}
                    />
                </div>
                    <Form.Text className="text-muted" style={{marginLeft: "5px"}}>
                    Add all iamges in your queue to a new or existing collection!
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    )
}

export default QueueInputBar; 