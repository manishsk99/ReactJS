import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { validateInputValue } from "../basic/Basic";
import { API_BASE_URL, THEME_COLOR } from "../basic/Constants";
import { ADDRESS_TYPE_LIST, STATE_LIST } from "../basic/StaticData";
import WaitPage from "../basic/WaitPage";
import AppInput from "../sub_components/AppInput";

function AddAddress(props) {
    const location = useLocation();
    const { addressDetail } = location.state;

    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [isDisplaySuccessModel, setIsDisplaySuccessModel] = useState(false);

    let [isApiError, setIsApiError] = useState(false);
    let [apiError, setApiError] = useState("");
    let navigate = useNavigate();

    let [isEditAddress, setIsEditAddress] = useState(false);
    let [name, setName] = useState("");
    let [phone, setPhone] = useState("");
    let [otherPhone, setOtherPhone] = useState("");
    let [pinCode, setPinCode] = useState("");
    let [address1, setAddress1] = useState("");
    let [address2, setAddress2] = useState("");
    let [landmark, setLandmark] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [type, setType] = useState("");
    let [inputProps] = useState({
        name: { type: "text", name: "Full Name", rule: "required|alphaOnly", setFunction: setName },
        phone: { type: "text", name: "Phone", rule: "required|phone", setFunction: setPhone },
        other_phone: { type: "text", name: "Other Phone", rule: "phone", setFunction: setOtherPhone },
        pin_code: { type: "text", name: "Pin Code", rule: "required|pincode", setFunction: setPinCode },
        address1: { type: "text", name: "Address1", rule: "required", setFunction: setAddress1 },
        address2: { type: "text", name: "Address2", setFunction: setAddress2 },
        landmark: { type: "text", name: "Landmark", setFunction: setLandmark },
        city: { type: "text", name: "City", rule: "required", setFunction: setCity },
        state: { type: "select", name: "State", rule: "required", setFunction: setState, items: STATE_LIST },
        type: { type: "radio", name: "Address Type", rule: "required", setFunction: setType, items: ADDRESS_TYPE_LIST }
    });
    let [title, setTitle] = useState("Add Address");

    useEffect(() => {
        document.title = "Add Address";
        if (addressDetail) {
            setIsEditAddress(true);
            setTitle("Update Address");
            document.title = "Update Address";
        }
    }, [addressDetail]);

    function formHandling(e) {
        e.preventDefault();
    }

    function checkValues(data) {
        let isValidationError = false;

        for (let key in inputProps) {
            let value = inputProps[key];
            // console.log("key:" + key + "," + value);
            let v = validateInputValue(value.type, value.name, data[key], value.rule);
            if (v["is_invalid"] === true) {
                isValidationError = true;
                setApiError(v["error_message"]);
                return isValidationError;
            }
        }
        return isValidationError;
    }


    function addItem() {
        let url = "addaddress";
        let reqType = "POST";
        let data = {
            users_id: localStorage.getItem('userId'),
            name: name,
            phone: phone,
            pin_code: pinCode,
            state: state,
            address1: address1,
            address2: address2,
            city: city,
            landmark: landmark,
            type: type,
            other_phone: otherPhone
        };
        if (isEditAddress) {
            data["id"] = addressDetail["id"];
            url = "updateaddress";
            reqType = "PUT";
        }
        setIsApiError(false);
        let isValidationError = checkValues(data);
        // console.log("isValidationError::" + isValidationError);
        if (isValidationError) {
            setIsApiError(true);
            return;
        }

        let dataJson = JSON.stringify(data);

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + url, {
            method: reqType,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: dataJson
        }).then(res => res.json())
            .then(
                (responseJSON) => {
                    setWaitPageProgress(90);
                    setIsDisplayWaitPage(false);
                    // console.log(responseJSON);
                    // console.log("API Status:: " + responseJSON["success"]);
                    if (responseJSON["success"]) {
                        setIsDisplaySuccessModel(true);
                    } else {
                        setIsApiError(true);
                        setApiError("Some error occurred.");
                        if (responseJSON["success"] === false) {
                            setApiError(responseJSON["message"]);
                        }
                    }
                },
                (error) => {
                    // console.log(error);
                    setIsDisplayWaitPage(false);
                    setIsApiError(true);
                    setApiError("Some error occurred.");
                }
            )
    }

    function addressAddDone() {
        setIsDisplaySuccessModel(false);
        if (props.returnTo) {
            navigate(props.returnTo);
        } else {
            navigate("/manageaddress");
        }
    }

    return (
        <div className="row justify-content-left">
            <div className="card col-sm-8 col-lg-6">
                <form onSubmit={formHandling}>
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    <Modal show={isDisplaySuccessModel} aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Body>
                            <p className='text-success'> {title} Successfull. </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => addressAddDone(false)} className={`btn btn-${THEME_COLOR}`} >Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <h1 className="card-title text-center">{title}</h1>

                    {isApiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}

                    {
                        Object.keys(inputProps).map((field, key) =>
                            <AppInput key={key}
                                type={inputProps[field].type}
                                name={inputProps[field].name}
                                setFunction={inputProps[field].setFunction}
                                validationRule={inputProps[field].rule}
                                items={inputProps[field].items}
                                defaultValue={isEditAddress ? addressDetail[field] : ""}
                            />
                        )
                    }

                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onClick={addItem} value={title} />
                    <br />

                </form>
            </div>
        </div>
    );
}

export default AddAddress;