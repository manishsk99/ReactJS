import { Button, Container } from "react-bootstrap";
import { THEME_COLOR } from "../basic/Constants";

function MakePayment() {
    return ( 
        <Container>
            <div className="mb-3 mt-3 justify-content-center">
                Make Payment
                <div className="row mt-3">
                <div className="col-sm-4 col-lg-3"></div>
                <div className="col-sm-4 col-lg-3">
                    <Button className={"form-control form-control-lg btn btn-" + THEME_COLOR} >Continue</Button>
                </div>
                </div>           
            </div>
        </Container>
     );
}

export default MakePayment;