import { useEffect, useState } from "react";
import { validateInputValue, parseValidateRule } from "../basic/Basic";

function AppInput(props) {
    let [field, setField] = useState("");
    let [fieldError, setFieldError] = useState("");
    let [isFieldInvalid, setIsFieldInvalid] = useState("");
    let [nameSuffix, setNameSuffix] = useState("");

    let [maxLength, setMaxLength] = useState(0);
    let [isValidate, setIsValidate] = useState(false);
    let [isMandatory, setIsMandatory] = useState(false);

    useEffect(() => {
        // console.log("props.validationRule: " + props.validationRule);
        let validationRules = parseValidateRule(props.validationRule, props.type);
        setMaxLength(validationRules["max_length"]);
        setIsMandatory(validationRules["is_mandatory"]);
        if (props.validationRule) {
            setIsValidate(true);
        }
        if (props.nameSuffix) {
            setNameSuffix(props.nameSuffix);
        }
        if (props.defaultValue && field === "") {
            setField(props.defaultValue);
            props.setFunction(props.defaultValue);
        }
    }, [props, field]);

    function checkField(value) {
        let isValidationError = false;
        if (isValidate) {
            let v = validateInputValue(props.type, props.name, value, props.validationRule);
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
                    <textarea className="form-control" placeholder={props.name + (isMandatory ? "*" : "")}
                        id={props.name} value={field} onChange={setFieldValue}
                        onBlur={(e) => checkField(e.target.value)} style={{ height: '100px' }} />
                    :
                    props.type === "number" ?
                        <input type={props.type} className="form-control" placeholder={props.name + (isMandatory ? "*" : "")}
                            id={props.name} value={field} onChange={setFieldValue}
                            onBlur={(e) => checkField(e.target.value)}
                            min={props.type === "number" ? "0" : ""}
                            max={(10 ** (maxLength - 1)) - 1}
                        />
                        :
                        props.type === "select" ?
                            <select className="form-select" onChange={setFieldValue} id={props.name}
                                onBlur={(e) => checkField(e.target.value)} value={field} >
                                {props.items.map((item, key) =>
                                    <option key={key} value={item.id}>{item.name}</option>
                                )}
                            </select>
                            :
                            props.type === "radio" ?
                                <>
                                    <span className="form-label">{props.name + nameSuffix + (isMandatory ? "*" : "")} </span>
                                    {
                                        props.items.map((item, key) =>
                                            <div className="form-check form-check-inline ms-2" key={key}>
                                                {item.id === field ?
                                                    <input key={key} className="form-check-input" type="radio" name="iro" id={item.id}
                                                        value={item.id} onChange={setFieldValue} checked="checked" />
                                                    //checked is causing error: Warning: A component is changing an uncontrolled input to be controlled
                                                    :
                                                    <input key={key} className="form-check-input" type="radio" name="iro" id={item.id}
                                                        value={item.id} onChange={setFieldValue} />
                                                }
                                                <label className="form-check-label" htmlFor="ir1">{item.name}</label>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <input type={props.type} className="form-control" placeholder={props.name + (isMandatory ? "*" : "")}
                                    id={props.name} value={field} onChange={setFieldValue}
                                    onBlur={(e) => checkField(e.target.value)}
                                    maxLength={maxLength}
                                />
                }
                {
                    props.type === "radio" ? "" : <label className="text-muted" htmlFor={props.name}>{props.name + nameSuffix + (isMandatory ? "*" : "")}</label>
                }
                {isFieldInvalid ? <span className="text-danger"> {fieldError} </span> : ""}
            </div>
        </>
    );
}

export default AppInput;