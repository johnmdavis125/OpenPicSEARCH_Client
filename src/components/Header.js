import React from 'react';
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Link from './Link';
import './componentStyles/Header.css'; 


const Header = () => {  
    return (
        <div>
            <Container fluid className="box" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Row>
                    <Col sm ={11} md={8} lg={6} xl={5} xxl={4} >
                        <Image className="pixLogo" src="OpenPixLogoV2.png" />
                    </Col>
                </Row>
                <Row>
                    <Nav className="justify-content-end customNav">
                        <Nav.Item>
                            <Nav.Link>
                                <Link href="/about" className='customNavLink' >About</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link href="/" className='customNavLink' >Search</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link href="/queue" className='customNavLink' >Queue</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link href="/collections" className='customNavLink' >Collections</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>

            </Container>
        </div>
    )
}

export default Header; 