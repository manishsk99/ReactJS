import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccountSidebar() {
    return (
        <ListGroup defaultActiveKey="#">
            <ListGroup.Item action as={Link} to="/myprofile" href="#link1">
                My profile
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/myorders" href="#link3">
                My Orders
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/manageaddress" href="#link5">
                Manage Address
            </ListGroup.Item>
        </ListGroup>
    );
}

export default AccountSidebar;