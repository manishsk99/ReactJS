import { useEffect, useState } from "react";
import { validateField } from "../basic/Basic";

function AppInput(props) {
    let [field, setField] = useState("");
    let [fieldError, setFieldError] = useState("");
    let [isFieldInvalid, setIsFieldInvalid] = useState("");
    
    let [minLength, setMinLength] = useState(0);
    let [maxLength, setMaxLength] = useState(0);
    let [isAlphaOnly, setIsAlphaOnly] = useState(false);

    useEffect (() =>{
        setMinLength(2);
        setMaxLength(50);
        setIsAlphaOnly(true);
        if (props.validationType === "1") {
            setMaxLength(20);
            setIsAlphaOnly(false);
        } else if (props.type === "textarea") {
            setMaxLength(1000);
            setIsAlphaOnly(false);
        } else if (props.type === "number") {
            setMaxLength(10);
            setIsAlphaOnly(false);
        }
    },[props]);

    function checkField(value) {
        let isValidationError = false;
        if (props.isMandatory) {
            let v = validateField(" " + props.name, value, minLength, maxLength, isAlphaOnly);
            setIsFieldInvalid(false);
            if (v["is_invalid"] === true) {
                isValidationError = true;
                setIsFieldInvalid(true);
                setFieldError(v["error_message"]);
            }
        }
        return isValidationError;
    }

    function setFieldValue(e) {
        setField(e.target.value);
        props.setFunction(e.target.value);
    }

    return (
        <>
            <div className="form-floating mb-3">
                {props.type === "textarea" ?
                    <textarea className="form-control" placeholder={props.name + (props.isMandatory ? "*" : "")}
                        id={props.name} value={field} onChange={setFieldValue}
                        onBlur={(e) => checkField(e.target.value)} style={{ height: '100px' }} />
                    :
                    <input type={props.type} className="form-control" placeholder={props.name + (props.isMandatory ? "*" : "")}
                        id={props.name} value={field} onChange={setFieldValue}
                        onBlur={(e) => checkField(e.target.value)} 
                        min={props.type === "number" ? "0" : ""}
                        maxLength={maxLength}
                        />
                }
                <label className="text-muted" htmlFor={props.name}>{props.name + (props.isMandatory ? "*" : "")}</label>
                {isFieldInvalid ? <span className="text-danger"> {fieldError} </span> : ""}
            </div>
        </>
    );
}

export default AppInput;