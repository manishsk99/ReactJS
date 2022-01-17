import { useEffect, useState } from "react";
import { checkFieldValue } from "../basic/Basic";

function AppInput(props) {
    let [field, setField] = useState("");
    let [fieldError, setFieldError] = useState("");
    let [isFieldInvalid, setIsFieldInvalid] = useState("");
    let [nameSuffix, setNameSuffix] = useState("");

    let [minLength, setMinLength] = useState(0);
    let [maxLength, setMaxLength] = useState(0);
    let [isAlphaOnly, setIsAlphaOnly] = useState(false);
    let [isValidate, setIsValidate] = useState(false);
    let [isMandatory, setIsMandatory] = useState(false);

    useEffect(() => {

        setMinLength(2);
        setMaxLength(50);
        setIsAlphaOnly(false);
        if (props.isMandatory) {
            setIsMandatory(true);
            setIsValidate(true);
        } else {
            setMinLength(0);
        }
        if (props.validationType === "1") {
            setIsValidate(true);
        } else if (props.validationType === "2") {
            setIsAlphaOnly(true);
            setIsValidate(true);
        } else if (props.validationType === "3") {
            setMaxLength(20);
            setIsAlphaOnly(true);
            setIsValidate(true);
        } else if (props.type === "textarea") {
            setMaxLength(1000);
        } else if (props.type === "number") {
            setMaxLength(10);
        } else if (props.type === "select") {
            setMinLength(0);
            setMaxLength(10);
        }
        if (props.nameSuffix) {
            setNameSuffix(props.nameSuffix);
        }
    }, [props]);

    function checkField(value) {
        let isValidationError = false;
        if (isValidate) {
            let v = checkFieldValue(props.type, " " + props.name, value, minLength, maxLength, isAlphaOnly, isMandatory);
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
        // console.log("value:" + e.target.value );
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
                    props.type === "number" ?
                        <input type={props.type} className="form-control" placeholder={props.name + (props.isMandatory ? "*" : "")}
                            id={props.name} value={field} onChange={setFieldValue}
                            onBlur={(e) => checkField(e.target.value)}
                            min={props.type === "number" ? "0" : ""}
                            max={(10 ** (maxLength - 1)) - 1}
                        />
                        :
                        props.type === "select" ?
                            <select className="form-select" onChange={setFieldValue} 
                            onBlur={(e) => checkField(e.target.value)} >
                                {props.items.map((item, key) => 
                                    <option key={key} value={item.id}>{item.name}</option>
                                )}
                            </select>
                            :
                            <input type={props.type} className="form-control" placeholder={props.name + (props.isMandatory ? "*" : "")}
                                id={props.name} value={field} onChange={setFieldValue}
                                onBlur={(e) => checkField(e.target.value)}
                                maxLength={maxLength}
                            />
                }
                <label className="text-muted" htmlFor={props.name}>{props.name + nameSuffix + (props.isMandatory ? "*" : "")}</label>
                {isFieldInvalid ? <span className="text-danger"> {fieldError} </span> : ""}
            </div>
        </>
    );
}

export default AppInput;