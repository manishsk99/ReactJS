import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Modal, Button } from 'react-bootstrap';
import { THEME_COLOR, API_BASE_URL } from './Constants';
import { checkAllFieldsValues } from './Basic';
import WaitPage from './WaitPage';
import AppInput from '../sub_components/AppInput';

function Signup() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [isDisplaySuccessModel, setIsDisplaySuccessModel] = useState(false);

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [confirm_password, setConfirm_Password] = useState("");
    let [isApiError, setIsApiError] = useState(false);
    let [apiError, setApiError] = useState("");

    let navigate = useNavigate();
    let [inputProps] = useState({
        name: { type: "text", name: "Full Name", rule: "required|alphaOnly", setFunction: setName },
        email: { type: "text", name: "Email", rule: "required|email", setFunction: setEmail },
        phone: { type: "text", name: "Phone", rule: "required|phone", setFunction: setPhone },
        password: { type: "password", name: "Password", rule: "required|min:8|max:15", setFunction: setPassword },
        confirm_password: { type: "password", name: "Confirm Password", rule: "required|min:8|max:15", setFunction: setConfirm_Password }
    });

    useEffect(() => {
        document.title = "Signup";
      }, []);

    function formHandling(e) {
        e.preventDefault();
    }

    function doSignup() {
        setIsApiError(false);
        let data = { name, email, phone, password, confirm_password };
        let dataJson = JSON.stringify(data);
        // console.log(dataJson);

        let isValidationError = checkAllFieldsValues(data, inputProps, setApiError);
        if (isValidationError) {
            return;
        }
        if (password !== confirm_password) {
            isValidationError = true;
            setIsApiError(true);
            setApiError("Confirm password and password must be same.");
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "signup", {
            method: 'POST',
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
                    // console.log("Error:: " + error);
                    setIsDisplayWaitPage(false);
                    setIsApiError(true);
                    setApiError("Some error occurred.");
                }
            )
    }

    function signupDone() {
        setIsDisplaySuccessModel(false);
        navigate("/login");
    }
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <form onSubmit={formHandling}>

                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    <Modal show={isDisplaySuccessModel} aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Body>
                            <p className='text-success'> Signup Successfull. Please check your email account to verify the email before login. </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={signupDone} className={`btn btn-${THEME_COLOR}`} >Login</Button>
                        </Modal.Footer>
                    </Modal>

                    <h1 className="card-title text-center">Signup</h1>

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
                            />
                        )
                    }

                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onClick={doSignup} value="Signup" />
                    <br />
                    <br />

                    <span>Already have an account? <Link to="/login">Login</Link></span>


                </form>
            </div>
        </div>
    )
}

export default Signup;