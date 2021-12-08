import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {THEME_COLOR} from './Constants';
import { BsCartFill } from 'react-icons/bs';

function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg={THEME_COLOR} variant="dark">
                <Container>
                    
                    {/* <Link className="navbar-brand" to="/"><img src="././epur_big_logo.png" width="100" height="30" class="d-inline-block align-top" alt="e-PUR"/></Link>  */}
                    <Link className="navbar-brand" to="/">e-PUR</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link eventKey="1"><Link className="nav-link" to="/">Home</Link></Nav.Link>
                            <Nav.Link eventKey="2"><Link className="nav-link" to="/About">About Us</Link></Nav.Link>
                            <Nav.Link eventKey="3"><Link className="nav-link" to="/contact">Contact Us</Link></Nav.Link>
                        </Nav>
                        <Nav>
                        
                            <Nav.Link eventKey="4"><Link className="nav-link text-white position-relative" to="/cart">
                                <BsCartFill/>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    5
                                    <span class="visually-hidden">No. of items</span>
                                </span>
                                </Link></Nav.Link>
                            <Nav.Link eventKey="5"><Link className="nav-link" to="/login">Login</Link></Nav.Link>
                            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                <Nav.Link eventKey="6"><Link className="dropdown-item" to="/profile">Profile</Link></Nav.Link>
                                <Nav.Link eventKey="7"><Link className="dropdown-item" to="/transaction">Transactions</Link></Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link eventKey="8"><Link className="dropdown-item" to="/logout">Logout</Link></Nav.Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                
                </Container>
            </Navbar>
        </>
    );
}

export default Header;