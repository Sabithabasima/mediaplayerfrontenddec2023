import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Upload } from 'react-feather';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div>
            <Navbar className="bg-body-secondary">
                <Container>
                    <Navbar.Brand >
                       <span className='text-primary'>
                        <Link className='text-danger' to={'/'} style={{textDecoration:'none'}} >
                         <Upload/>
                        <span>Vedio.com</span>
                        

                        </Link>
                       
                       </span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header