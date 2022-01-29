
import { API_BASE_URL } from "../basic/Constants";

function checkIfValueExist(validationRule, valueToFind) {
    let isValuePresent = false;
    validationRule = addRuleDelimiter(validationRule);
    valueToFind = addRuleDelimiter(valueToFind);
    if (validationRule.indexOf(valueToFind) >= 0) {
        isValuePresent = true;
    }
    return isValuePresent;
}

function getIfValueExist(validationRule, valueToFind) {
    let value = "";
    validationRule = addRuleDelimiter(validationRule);
    // valueToFind = addRuleDelimiter(valueToFind);
    if (validationRule.indexOf(valueToFind) >= 0) {
        let beginInd = validationRule.indexOf(valueToFind);
        let endInd = validationRule.indexOf("|", beginInd);
        value = validationRule.slice(beginInd + 1, endInd);
    }
    return value;
}

function addRuleDelimiter(value) {
    return "|" + value + "|";
}

export function parseValidateRule(validationRuleStr, fieldValueType) {
    let isMandatory = checkIfValueExist(validationRuleStr, "required");
    let isAlphaOnly = checkIfValueExist(validationRuleStr, "alphaOnly");
    let isNumberOnly = checkIfValueExist(validationRuleStr, "numberOnly");
    let isAlphanumericOnly = checkIfValueExist(validationRuleStr, "alphanumericOnly");
    let isEmail = checkIfValueExist(validationRuleStr, "email");
    let isPhone = checkIfValueExist(validationRuleStr, "phone");
    let isPinCode = checkIfValueExist(validationRuleStr, "pincode");
    let minlength = getIfValueExist(validationRuleStr, "min");
    let maxlength = getIfValueExist(validationRuleStr, "max");
    if (minlength === "") {
        minlength = 1;
    }
    if (maxlength === "") {
        maxlength = 50;
    }
    if (isPhone) {
        isNumberOnly = true;
        minlength = 10;
        maxlength = 10;
    }
    if (isPinCode) {
        isNumberOnly = true;
        minlength = 6;
        maxlength = 6;
    }

    let validationRules = {
        "is_mandatory": isMandatory,
        "is_alpha_only": isAlphaOnly,
        "is_number_only": isNumberOnly,
        "is_alphanumeric_only": isAlphanumericOnly,
        "min_length": minlength,
        "max_length": maxlength,
        "is_email": isEmail,
        "is_phone": isPhone,
        "is_pin_code": isPinCode
    };
    return validationRules;
}

export function validateInputValue(fieldValueType, fieldName, fieldValue, validationRuleStr) {

    let validationRules = parseValidateRule(validationRuleStr, fieldValueType);
    let isMandatory = validationRules["is_mandatory"];
    let isAlphaOnly = validationRules["is_alpha_only"];
    let isNumberOnly = validationRules["is_number_only"];
    let isAlphanumericOnly = validationRules["is_alphanumeric_only"];
    let isEmail = validationRules["is_email"];
    let minlength = validationRules["min_length"];
    let maxlength = validationRules["max_length"];

    let validationOutput = {};
    validationOutput["is_invalid"] = false;

    fieldValue = fieldValue + "";
    // console.log('fieldValue::' + fieldValue);
    // console.log('fieldValue::' + typeof fieldValue);
    var fieldValue1 = fieldValue;
    if(fieldValue && !isNumberOnly) {
        fieldValue.replace(/(\r\n|\n|\r)/g, "  ");
    }
    // console.log('fieldValue1::' + fieldValue1.length);
    if (isMandatory && fieldValue === "") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can not be empty.";
    } else if (fieldValue !== "") {
        if (fieldValue.length < minlength || fieldValue1.length > maxlength) {
            validationOutput["is_invalid"] = true;
            if (minlength === maxlength) {
                validationOutput["error_message"] = fieldName + " must be exactly " + minlength + " charector long.";
            } else {
                validationOutput["error_message"] = fieldName + " must be between " + minlength + " to " + maxlength + " charector.";
            }
        } else if (isAlphaOnly && !fieldValue.match(/^[a-zA-Z\s]+$/)) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " can contain letters only.";
        } else if (isNumberOnly && !fieldValue.match(/^[0-9]*$/)) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " can contain numbers only.";
        } else if (isAlphanumericOnly && !fieldValue.match(/^[a-zA-Z0-9\s]+$/)) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = fieldName + " can contain numbers and letters only.";
        } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
            validationOutput["is_invalid"] = true;
            validationOutput["error_message"] = "Email is not valid.";
        }
    }
    return validationOutput;
}

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
                // console.log("API call back");
                // console.log("API Status:: " + JSON.stringify(responseJSON["data"]));
                if (responseJSON["success"]) {
                    setterFunction(responseJSON["data"]);
                    apiResponse["data"] = responseJSON["data"];
                    if (isSaveInLS === true) {
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