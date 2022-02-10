import { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { THEME_COLOR } from "../basic/Constants";
import  { AddressList } from "./ManageAddress";

function SelectAddress() {
    let [apiError, setApiError] = useState("");
    let [selectedAddressId, setSelectedAddressId] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Select Address";
    }, []);

    function saveDataAndMoveToNext() {
        setApiError("");
        // console.log("saveDataAndMoveToNext::" + selectedAddressId);
        if (selectedAddressId === 0) {
            setApiError("Please select an address to deliver.");
            return;
        }
        localStorage.setItem("selectedAddressId", selectedAddressId);
        navigate("/makepayment");
    }
    return (
        <Container>
            <div className="row mb-3 mt-3 justify-content-center">
                <div className="card col-sm-8 col-lg-6 p-5">
                    <h1 className="card-title text-center">Select Address</h1>
                    {apiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}
                    <AddressList isDisplayRadio="true" returnTo="/selectaddress" setAddressToParent={setSelectedAddressId} />
                    <div className="row mt-3 justify-content-right">
                        <div className="col-sm-6 col-lg-6"></div>
                        <div className="col-sm-6 col-lg-6">
                            <Button className={"form-control form-control-lg btn btn-" + THEME_COLOR}
                                onClick={saveDataAndMoveToNext} >Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SelectAddress;