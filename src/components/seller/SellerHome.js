import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SellerAccountSidebar from "./SellerAccountSidebar";

function SellerHome(props) {
    return (
        localStorage.getItem("is_seller_logged_In") ?
            <Container>
                <div className="row pt-4 pb-4">
                    <div className="col-md-3 d-none d-md-block">
                        <SellerAccountSidebar />
                    </div>
                    <div className="col-md-9 ps-4 pe-4">
                        <props.comp />
                    </div>
                </div>
            </Container>
            
            : <Navigate to="/slogin" />
    );
}

export default SellerHome;