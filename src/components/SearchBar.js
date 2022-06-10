import React from 'react';
import { useState } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomDropDown from './CustomDropdown';
import './componentStyles/SearchBar.css';

const SearchBar = ({ onSubmit, setMostRecentSearch, onSelect }) => {
    
    const [term, setTerm] = useState("random"); 

    const onFormSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(term);
        console.log(onSubmit);  
        setMostRecentSearch(term); 
    }

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="m-3" style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: 'flex', maxWidth: '1000px'}}>
                    <Form.Control
                        type="text"
                        placeholder='Enter Search Term...'
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        />
                    <Button variant="success" type="submit" style={{minWidth: '150px'}}>
                        Search
                    </Button>
                    <CustomDropDown 
                        onSelect={onSelect}
                        btnLabel="Search in Browser" 
                        customOptions={['Search site', 'Search site2', 'Search site3', 'Search All']}
                        dropdownDisabled={false}
                        eventKeys={['site1', 'site2', 'site3', 'all']}
                    />
                </div>
                    <Form.Text className="text-muted" style={{marginLeft: "5px"}}>
                    All images sourced from public domain/open license databases. Enjoy :)
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchBar; 