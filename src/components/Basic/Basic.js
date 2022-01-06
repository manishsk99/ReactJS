export function validateField(fieldName, fieldValue, minlength = 2, maxlength = 50, isAlphaOnly = true) {
    let validationOutput = {};
    validationOutput["is_invalid"] = false;
    if (fieldValue === "") {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can not be empty.";
    } else if (fieldValue.length < minlength || fieldValue.length > maxlength) {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " must be between " + minlength + " to " + maxlength + " charector.";
    } else if (isAlphaOnly && !fieldValue.match(/^[a-zA-Z\s]+$/)) {
        validationOutput["is_invalid"] = true;
        validationOutput["error_message"] = fieldName + " can contain letters only.";
    }
    return validationOutput;
}

export function checkField(fieldName, fieldValue, minlength = 2, maxlength = 50, isAlphaOnly = true) {
    let isValidationError = false;
    let v = validateField(fieldName, fieldValue, minlength, maxlength, isAlphaOnly);
    if (v["is_invalid"] === true) {
        isValidationError = true;
    }
    return isValidationError;
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