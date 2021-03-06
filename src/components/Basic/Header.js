import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BRAND_NAME, THEME_COLOR } from './Constants';
import { BsCartFill } from 'react-icons/bs';

export function logoutUser(updateLocalData) {
    localStorage.removeItem('is_logged_In');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone');
    updateLocalData(localStorage);
}

export function logoutSeller(updateLocalData) {
    localStorage.removeItem('is_seller_logged_In');
    localStorage.removeItem('sellerId');
    updateLocalData(localStorage);
}

function Header(props) {

    function logout() {
        logoutUser(props.updateLocalData);
    }
    function slogout() {
        logoutSeller(props.updateLocalData);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg={THEME_COLOR} variant="dark" className='sticky-top'>
                <Container>

                    {/* <Link className="navbar-brand" to="/"><img src="././epur_big_logo.png" width="100" height="30" className="d-inline-block align-top" alt="e-PUR"/></Link>  */}
                    <Link className="navbar-brand" to="/">{BRAND_NAME}</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
                            <Nav.Link eventKey="2" as={Link} to="/About">About Us</Nav.Link>
                            <Nav.Link eventKey="3" as={Link} to="/contact">Contact Us</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                props.localData["is_seller_logged_In"] ? "" :
                                    <Nav.Link eventKey="4" as={Link} className="text-white position-relative" to="/cart">
                                        <BsCartFill />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {props.cartItemCount}
                                            <span className="visually-hidden">No. of items</span>
                                        </span>
                                    </Nav.Link>
                            }
                            {props.localData["is_logged_In"] ?
                                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                    <NavDropdown.Item eventKey="6" as={Link} to="/myprofile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="8" as={Link} to="/myorders">My Orders</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="10" as={Link} to="/manageaddress">Manage Address</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="9" as={Link} to="/logout" onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                :
                                props.localData["is_seller_logged_In"] ?
                                    <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                                        <NavDropdown.Item eventKey="6" as={Link} to="/sprofile">Profile</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="6" as={Link} to="/sorders">Orders</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="7" as={Link} to="/manageitem">Manage Items</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="7" as={Link} to="/additem">Add Item</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item eventKey="9" as={Link} to="/logout" onClick={slogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <Nav.Link eventKey="5" as={Link} to="/login">Login</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    );
}

export default Header;