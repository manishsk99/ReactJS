
import { API_BASE_URL } from "../basic/Constants";

export function validateField(fieldName, fieldValue, minlength = 2, maxlength = 50, isAlphaOnly = true, isMandatory = true) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    // console.log('fieldValue::' + fieldValue.length);
    var fieldValue1 = fieldValue.replace(/(\r\n|\n|\r)/g, "  ");
    // console.log('fieldValue1::' + fieldValue1.length);
    if (isMandatory && fieldValue === "") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can not be empty.";
    } else if (fieldValue !== "") {
        if (fieldValue.length < minlength || fieldValue1.length > maxlength) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " must be between " + minlength + " to " + maxlength + " charector.";
        } else if (isAlphaOnly && !fieldValue.match(/^[a-zA-Z\s]+$/)) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " can contain letters only.";
        }
    }
    return validationOutput;
}

export function checkFieldValue(fieldValueType, fieldName, fieldValue, minLength = 2, maxLength = 50, isAlphaOnly = true, isMandatory = true) {
    let v = [];
    if (fieldValueType === "number") {
        v = validateNumber(fieldName, fieldValue, maxLength, isMandatory);
    } else if (fieldValueType === "email") {
        v = validateEmail(fieldName);
    } else if (fieldValueType === "select") {
        v = validateSelect(fieldName, fieldValue, isMandatory);
    } else {
        v = validateField(fieldName, fieldValue, minLength, maxLength, isAlphaOnly, isMandatory);
    }
    return v;
}

export function validateNumber(fieldName, fieldValue, maxlength = 10, isMandatory = false) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    var pointIndex = fieldValue.indexOf('.');
    let maxLen = maxlength;
    if (pointIndex >= 0) {
        maxLen = maxlength + 1;
    }
    // console.log('fieldValue::' + fieldValue);
    // console.log('pointIndex::' + pointIndex);
    // console.log('fieldValue.length::' + fieldValue.length);
    if (isMandatory && fieldValue === "") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can not be empty.";
    } else if (fieldValue.length > maxLen) {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can't be more than " + maxlength + " charector.";
    } else if (pointIndex >= 0) {
        if (pointIndex > fieldValue.length) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " should contain atleast 1 digits after decimal.";
        } else if (pointIndex < fieldValue.length - 3) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " can contain only 2 digits after decimal.";
        }
    }
    return validationOutput;
}

export function validateEmail(fieldValue) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    if (fieldValue === "") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = "Email can not be empty.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = "Email is not valid.";
    }
    return validationOutput;
}

export function validateSelect(fieldName, fieldValue, isMandatory) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    if (isMandatory && fieldValue === "0") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = "Please select a valid option for " + fieldName + ".";
    }
    return validationOutput;
}

export async function apiGetCall(subUrl, setterFunction, isSaveInLS, lsName) {
    let apiResponse = {};
    apiResponse["is_api_error"] = false;
    await fetch(API_BASE_URL + subUrl).then(res => res.json())
        .then(
            (responseJSON) => {
                console.log("API call back");
                // console.log("API Status:: " + JSON.stringify(responseJSON["data"]));
                if (responseJSON["success"]) {
                    setterFunction(responseJSON["data"]);
                    apiResponse["data"] = responseJSON["data"];
                    if(isSaveInLS === true) {
                        localStorage.setItem(lsName, JSON.stringify(responseJSON["data"]));
                    }                    
                } else {
                    apiResponse["is_api_error"] = true;
                    apiResponse["api_error"] = "Some error occurred.";
                    if (responseJSON["success"] === false) {
                        apiResponse["api_error"] = responseJSON["message"];
                    }
                }
            },
            (error) => {
                apiResponse["is_api_error"] = true;
                apiResponse["api_error"] = "Some error occurred.";
                if (localStorage.getItem(lsName)) {
                    apiResponse["api_error"] = JSON.parse(localStorage.getItem(lsName));
                }
                // console.log("Error:: " + error);
            }
        );
    return apiResponse;
}