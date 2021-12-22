import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Modal, Button } from 'react-bootstrap';
import { THEME_COLOR, API_BASE_URL } from './Constants';
import { validateField, validateEmail } from './Basic';
import WaitPage from './WaitPage';

function Signup() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [isDisplaySuccessModel, setIsDisplaySuccessModel] = useState(false);

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm_password, setConfirm_Password] = useState("");
    let [isApiError, setIsApiError] = useState(false);
    let [isNameInvalid, setIsNameInvalid] = useState(false);
    let [isEmailInvalid, setIsEmailInvalid] = useState(false);
    let [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    let [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    let [confirmPasswordError, setConfirmPasswordError] = useState("");
    let navigate = useNavigate();

    function formHandling(e) {
        e.preventDefault();
    }
    function checkName(value) {
        let isValidationError = false;
        let v = validateField("Name", value);
        setIsNameInvalid(false);
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setIsNameInvalid(true);
            setNameError(v["error_message"]);
        }
        return isValidationError;
    }
    function checkEmail(value) {
        let isValidationError = false;
        let v = validateEmail(value);
        setIsEmailInvalid(false);
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setIsEmailInvalid(true);
            setEmailError(v["error_message"]);
        }
        return isValidationError;
    }
    function checkPassword(value) {
        let isValidationError = false;
        let v = validateField("Password", value, 8, 15, false);
        setIsPasswordInvalid(false);
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setIsPasswordInvalid(true);
            setPasswordError(v["error_message"]);
        }
        return isValidationError;
    }
    function checkConfirmPassword(value, password) {
        let isValidationError = false;
        let v = validateField("Confirm password", value, 8, 15, false);
        setIsConfirmPasswordInvalid(false);
        console.log(value);
        console.log(password);
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setIsConfirmPasswordInvalid(true);
            setConfirmPasswordError(v["error_message"]);
        }
        if (password !== value) {
            isValidationError = true;
            setIsConfirmPasswordInvalid(true);
            setConfirmPasswordError("Confirm password and password must be same.");
        }
        return isValidationError;
    }
    function checkValues(formData) {
        let isValidationError = false;
        if (checkName(formData["name"])) {
            isValidationError = true;
        }
        if (checkEmail(formData["email"])) {
            isValidationError = true;
        }
        if (checkPassword(formData["password"])) {
            isValidationError = true;
        }
        if (checkConfirmPassword(formData["confirm_password"], formData["password"])) {
            isValidationError = true;
        }
        return isValidationError;
    }

    function doSignup() {
        setIsApiError(false);
        let data = { name, email, password, confirm_password };
        let dataJson = JSON.stringify(data);
        console.log(dataJson);

        let isValidationError = checkValues(data);
        if (isValidationError) {
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: dataJson
        }).then((result) => {
            setWaitPageProgress(90);
            console.log("Response Status::", result.status);
            result.json().then((responseJSON) => {
                console.log(responseJSON);
                console.log(responseJSON["success"]);
            });
            
            setIsDisplayWaitPage(false);
            if (result.ok) {
                setIsDisplaySuccessModel(true);
            } else {
                console.log("Error::", result.statusText);
                setIsApiError(true);
            }
        });
    }

    function sugnupDone() {
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
                            <p className='text-success'> Signup Successfull. </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={sugnupDone} className={`btn btn-${THEME_COLOR}`} >Login</Button>
                        </Modal.Footer>
                    </Modal>

                    <h1 className="card-title text-center">Signup</h1>

                    {isApiError ? <Alert key="danger" variant="danger">
                        Some error occured!
                    </Alert> : ""}


                    <input type="text" className="form-control" placeholder="Full Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => checkName(e.target.value)} />
                    {isNameInvalid ? <span className="text-danger"> {nameError} </span> : ""}
                    <br />


                    <input type="email" className="form-control" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => checkEmail(e.target.value)} />
                    {isEmailInvalid ? <span className="text-danger"> {emailError} </span> : ""}
                    <br />


                    <input type="password" className="form-control" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => checkPassword(e.target.value)} />
                    {isPasswordInvalid ? <span className="text-danger"> {passwordError} </span> : ""}
                    <br />


                    <input type="password" className="form-control" placeholder="Confirm Password"
                        value={confirm_password} onChange={(e) => setConfirm_Password(e.target.value)}
                        onBlur={(e) => checkConfirmPassword(e.target.value, password)} />
                    {isConfirmPasswordInvalid ? <span className="text-danger"> {confirmPasswordError} </span> : ""}
                    <br />


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