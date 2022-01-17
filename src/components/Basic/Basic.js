export function validateField(fieldName, fieldValue, minlength = 2, maxlength = 50, isAlphaOnly = true, isMandatory = true) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    // console.log('fieldValue::' + fieldValue.length);
    var fieldValue1 = fieldValue.replace(/(\r\n|\n|\r)/g,"  ");
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
        validationOutput["error_message"] = "Please select a valid option for "+ fieldName +".";
    }
    return validationOutput;
}

// export async function apiCall(url, method, jsonData) {
//     let apiResponse = {};
//     fetch(url, {
//         method: method,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: jsonData
//     }).then((result) => {
//         console.log("Response Status::", result.status);
//         apiResponse["status"] = result.status;
//         result.json().then((responseJSON) => {
//             console.log(responseJSON);
//             console.log(responseJSON["success"]);
//             apiResponse["data"] = responseJSON;
//         });
//         if (result.ok) {
//             apiResponse["is_success"] = true;
//         } else {
//             console.log("Error::", result.statusText);
//             apiResponse["error_message"] = result.statusText;
//             apiResponse["is_success"] = false;
//         }
//     });
//     return apiResponse;
// }