import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { THEME_COLOR, API_BASE_URL } from './Constants';
import { checkAllFieldsValues } from './Basic';
import { Alert } from 'react-bootstrap';
import WaitPage from './WaitPage';
import AppInput from '../sub_components/AppInput';

function Login(props) {
    let redirectTo = "/myprofile";
    const location = useLocation();
    if (location.state) {
        const { returnTo } = location.state;
        if (returnTo) {
            redirectTo = returnTo;
        }
         console.log("redirectTo: " + redirectTo);
    }
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [isApiError, setIsApiError] = useState(false);
    let [apiError, setApiError] = useState("");

    let navigate = useNavigate();
    let [inputProps] = useState({
        email: { type: "text", name: "Email", rule: "required|email", setFunction: setEmail },
        password: { type: "password", name: "Password", rule: "required", setFunction: setPassword }
    });

    function formHandling(e) {
        e.preventDefault();
    }


    useEffect(() => {
        document.title = "Login";
    }, []);

    
    function doLogin() {
        setIsApiError(false);
        let data = { email, password };
        let dataJson = JSON.stringify(data);

        let isValidationError = checkAllFieldsValues(data, inputProps, setApiError);
        if (isValidationError) {
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "login", {
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
                        localStorage.setItem('is_logged_In', true);
                        localStorage.setItem('name', responseJSON["data"]["name"]);
                        localStorage.setItem('email', responseJSON["data"]["email"]);
                        localStorage.setItem('userId', responseJSON["data"]["id"]);
                        props.updateLocalData(localStorage);
                        navigate(redirectTo);
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

    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <form onSubmit={formHandling}>
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    {isApiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}


                    <h1 className="card-title text-center">Login</h1>

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
                        onClick={doLogin} value="Login" />
                    <br />
                    <br />
                    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                    <br />
                    Forgot your password? <Link to="/forgetPassword">Click here</Link>
                </form>

            </div>
        </div>
    )
}

export default Login;