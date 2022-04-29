import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const Search = ({label, placeholder, btnText, altText}) => {
    return (
        <div>
            <Form>
                <Form.Group className="m-3" controlId="formBasicEmail" style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <Form.Label>{label}</Form.Label>
                </div>
                <div style={{display: "flex"}}>
                    <Form.Control type="email" placeholder={placeholder}/>
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

export default Search; 