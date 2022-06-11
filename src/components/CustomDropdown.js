import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';
import "./componentStyles/CustomDropdown.css";

const CustomDropDown = ({onSelect, btnLabel, customOptions, dropdownDisabled }) => {
    
    let dropDownItems = [];
    for (let i = 0; i < customOptions.length; i++){
        dropDownItems.push(
            <Dropdown.Item eventKey={customOptions[i]}>{customOptions[i]}</Dropdown.Item>
        )
    }
    
    const onDropDownSubmit = (selection) => {
        onSelect(selection);
    }

    return (
        <Dropdown onSelect={onDropDownSubmit}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" disabled={dropdownDisabled}>
                {btnLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropDownItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown; 
