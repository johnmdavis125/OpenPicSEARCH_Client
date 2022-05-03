import React from 'react';
import { useState } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = ({onSubmit, label, placeholder, btnText, altText}) => {
  
    const [term, setTerm] = useState(''); 
  
    const onFormSubmit = (event) => {
        event.preventDefault(); 

        // OnSubmit() === searchUnsplash()
        onSubmit(term); 
    }

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="m-3" style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <Form.Label>{label}</Form.Label>
                </div>
                <div style={{display: "flex"}}>
                    <Form.Control 
                        type="text"
                        placeholder={placeholder}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        />
                    <Button variant="success" type="submit">
                        {btnText}
                    </Button>
                    <Button variant="secondary" type="submit" style={{minWidth: "160px"}}>
                        Search in Browser
                    </Button>
                </div>
                    <Form.Text className="text-muted" style={{marginLeft: "5px"}}>
                    {altText}
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchBar; 