import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function SellerAccountSidebar() {
    return (
        <ListGroup defaultActiveKey="#">
            <ListGroup.Item action as={Link} to="/sprofile" href="#link1">
                My profile
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/sorders" href="#link3">
                My Orders
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/manageitem" href="#link4">
                Manage Item
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/additem" href="#link5">
                Add Item
            </ListGroup.Item>
        </ListGroup>
    );
}

export default SellerAccountSidebar;