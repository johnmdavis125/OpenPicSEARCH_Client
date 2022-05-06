import React from 'react';
import { useState } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomDropDown from './CustomDropdown';

const InputBar = ({onSubmit, label, placeholder, btn1Text, btn2Text, altText, dropDownConfig }) => {
  
    const [term, setTerm] = useState(''); 
  
    const onFormSubmit = (event) => {
        event.preventDefault(); 
        onSubmit(term); 
    }

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="m-3" style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <Form.Label>{label}</Form.Label>
                </div>
                <div style={{display: 'flex', maxWidth: '1000px'}}>
                    <Form.Control
                        type="text"
                        placeholder={placeholder}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        />
                    <Button variant="success" type="submit" style={{minWidth: '150px'}}>
                        {btn1Text}
                    </Button>
                    <CustomDropDown 
                        onSelect={dropDownConfig.onSelect}
                        btnLabel={btn2Text} 
                        customOptions={dropDownConfig.customOptions}
                        dropdownDisabled={dropDownConfig.dropdownDisabled}
                        eventKeys={dropDownConfig.eventKeys}
                    />
                </div>
                    <Form.Text className="text-muted" style={{marginLeft: "5px"}}>
                    {altText}
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    )
}

export default InputBar; 