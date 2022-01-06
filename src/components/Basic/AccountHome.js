import { Container } from "react-bootstrap";
import AccountSidebar from "./AccountSidebar";

function AccountHome(props) {
    return (
        <Container>
            <div className="row pt-4 pb-4">
                <div className="col-md-3 d-none d-md-block">
                    <AccountSidebar />
                </div>
                <div className="col-md-9 ps-4 pe-4">
                    <props.comp />
                </div>
            </div>
        </Container>
    );
}

export default AccountHome;