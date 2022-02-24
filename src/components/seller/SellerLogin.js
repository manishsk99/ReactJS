import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEME_COLOR, API_BASE_URL } from '../basic/Constants';
import { checkAllFieldsValues } from '../basic/Basic';
import { Alert } from 'react-bootstrap';
import AppInput from '../sub_components/AppInput';
import WaitPage from '../basic/WaitPage';

function SellerLogin(props) {
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
        document.title = "Seller Login";
    }, []);

    
    function doSellerLogin() {
        setIsApiError(false);
        let data = { email, password };
        let dataJson = JSON.stringify(data);

        let isValidationError = checkAllFieldsValues(data, inputProps, setApiError);
        if (isValidationError) {
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "slogin", {
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
                        localStorage.setItem('is_seller_logged_In', true);
                        localStorage.setItem('sellerId', responseJSON["data"]["id"]);
                        props.updateLocalData(localStorage);
                        navigate('/sprofile');
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
                    <h1 className="card-title text-center">Seller Login</h1>

                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

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
                        onClick={doSellerLogin} value="Login" />
                    <br />
                </form>

            </div>
        </div>
    )
}

export default SellerLogin;