import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccountSidebar() {
    return (
        <ListGroup defaultActiveKey="#">
            <ListGroup.Item action as={Link} to="/myprofile" href="#link1">
                My profile
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/additem" href="#link2">
                Add Item
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/trans" href="#link3">
                Transactions
            </ListGroup.Item>
        </ListGroup>
    );
}

export default AccountSidebar;