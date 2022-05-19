import React from 'react'; 
import ToastContainer from 'react-bootstrap/ToastContainer'; 
import Toast from 'react-bootstrap/Toast'; 

const CustomToast = ({ emptySearchToast, toggleEmptySearchToast }) => {    
    return (
        <ToastContainer className="p-3" position='middle-center'>
            <Toast 
                show={emptySearchToast} 
                onClose={toggleEmptySearchToast}
                delay={4000} autohide
                style={{justifyContent: 'center', alignItems: 'center'}}
                bg='warning'
            >
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                    />
                    <strong className="me-auto">Invalid Search</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Please enter a search term before clicking search :)</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default CustomToast; 