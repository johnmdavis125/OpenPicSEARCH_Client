import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropDown = ({onSelect, btnLabel, customOptions, dropdownDisabled}) => {
    return (
        <Dropdown onSelect={onSelect} style={{paddingLeft: '50vw'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={dropdownDisabled} style={{minWidth: '200px'}}>
                {btnLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="pexels">{customOptions[0]}</Dropdown.Item>
                <Dropdown.Item eventKey="unsplash">{customOptions[1]}</Dropdown.Item>
                <Dropdown.Item eventKey="pixabay">{customOptions[2]}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown; 
