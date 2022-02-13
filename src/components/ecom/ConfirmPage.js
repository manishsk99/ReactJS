import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function ConfirmPage() {
    return ( 
        <Container>
            <div className="row justify-content-center mb-3 mt-3 p-3">
                <div className="col-sm-8 card">
                    <h1 className="card-title text-center">Order Placed Successfully</h1>
                    <br />
                    <span>Go to <Link to="/myorders">My Orders</Link>
                     &nbsp;or <Link to="/">continue shopping</Link></span>
                    
                </div>
            </div>
        </Container>
     );
}

export default ConfirmPage;