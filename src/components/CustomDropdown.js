import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropDown = ({onSelect, btnLabel, customOptions, dropdownDisabled }) => {
    
    let dropDownItems = [];
    for (let i = 0; i < customOptions.length; i++){
        dropDownItems.push(
            <Dropdown.Item eventKey={customOptions[i]}>{customOptions[i]}</Dropdown.Item>
        )
    }
    
    const onFormSubmit = (event) => {
        onSelect(event);
    }

    return (
        <Dropdown onSelect={onFormSubmit}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" disabled={dropdownDisabled} style={{minWidth: '200px'}}>
                {btnLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropDownItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown; 
