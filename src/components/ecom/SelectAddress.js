import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { THEME_COLOR } from "../basic/Constants";
import ManageAddress from "./ManageAddress";

function SelectAddress() {
    return ( 
        <Container>
            <div className="mb-3 mt-3 justify-content-center">
                <ManageAddress isDisplayRadio="true" returnTo="/selectaddress"/>
                <div className="row mt-3">
                <div className="col-sm-4 col-lg-3"></div>
                <div className="col-sm-4 col-lg-3">
                    <Link className={"form-control form-control-lg btn btn-" + THEME_COLOR} to="/selectaddress" >Continue</Link>
                </div>
                </div>           
            </div>
        </Container>
     );
}

export default SelectAddress;