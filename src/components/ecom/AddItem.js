import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { validateField } from "../basic/Basic";
import { API_BASE_URL, THEME_COLOR } from "../basic/Constants";
import WaitPage from "../basic/WaitPage";
import AppInput from "../sub_components/AppInput";

function AddItem() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [isDisplaySuccessModel, setIsDisplaySuccessModel] = useState(false);

    let [isApiError, setIsApiError] = useState(false);
    let [apiError, setApiError] = useState("");

    let [name, setName] = useState("");
    let [shortDescription, setShortDescription] = useState("");
    let [description, setDescription] = useState("");
    let [categoriesId, setCategoriesId] = useState("");
    let [mrp, setMrp] = useState("");
    let [sellingPrice, setSellingPrice] = useState("");
    let [color, setColor] = useState("");
    let [meterial, setMeterial] = useState("");
    let [length, setLength] = useState("");
    let [width, setWidth] = useState("");
    let [height, setHeight] = useState("");

    let [primaryImage, setPrimaryImage] = useState(null);
    let [primaryImageError, setPrimaryImageError] = useState("");

    useEffect(() => {
        document.title = "Add Item";
    }, []);

    function formHandling(e) {
        e.preventDefault();
    }

    function selectImage(e) {
        let file = e.target.files[0];
        setPrimaryImage(file);
    }

    function checkField(fieldName, fieldValue, minlength = 2, maxlength = 50, isAlphaOnly = true) {
        let isValidationError = false;
        let v = validateField(fieldName, fieldValue, minlength, maxlength, isAlphaOnly);
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setApiError(v["error_message"]);
            return isValidationError;
        }
        return isValidationError;
    }

    function checkValues(formData) {
        let isValidationError = false;
        if (checkField(" Name", formData.get("name"), 2, 50, false)) {
            isValidationError = true;
            return isValidationError;
        }
        if (checkField(" Short Description", formData.get("short_description"), 2, 100, false)) {
            isValidationError = true;
            return isValidationError;
        }
        if (checkField(" Description", formData.get("description"), 2, 1000, false)) {
            isValidationError = true;
            return isValidationError;
        }
        // if (checkField(" Category Id", formData.get("categories_id"))) {
        //     isValidationError = true;
        //     return isValidationError;
        // }
        return isValidationError;
    }


    function addItem() {
        let formData = new FormData();
        formData.append("primary_image", primaryImage);
        formData.append("name", name);
        formData.append("short_description", shortDescription);
        formData.append("description", description);
        formData.append("categories_id", categoriesId);
        formData.append("mrp", mrp);
        formData.append("selling_price", sellingPrice);
        formData.append("color", color);
        formData.append("meterial", meterial);
        formData.append("length", length);
        formData.append("width", width);
        formData.append("height", height);

        setIsApiError(false);
        setPrimaryImageError("");
        if (formData.get("primary_image") === "null") {
            setPrimaryImageError("Please select primary image");
            return;
        }

        let isValidationError = checkValues(formData);
        // console.log("isValidationError::" + isValidationError);
        if (isValidationError) {
            setIsApiError(true);
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "additem", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(
                (responseJSON) => {
                    setWaitPageProgress(90);
                    setIsDisplayWaitPage(false);
                    // console.log(responseJSON);
                    // console.log("API Status:: " + responseJSON["success"]);
                    if (responseJSON["success"]) {
                        setIsDisplaySuccessModel(true);
                    } else {
                        setIsApiError(true);
                        setApiError("Some error occurred.");
                        if (responseJSON["success"] === false) {
                            setApiError(responseJSON["message"]);
                        }
                    }
                },
                (error) => {
                    // console.log(error);
                    setIsDisplayWaitPage(false);
                    setIsApiError(true);
                    setApiError("Some error occurred.");
                }
            )
    }

    return (
        <div className="row justify-content-left">
            <div className="card col-sm-8 col-lg-6">
                <form onSubmit={formHandling}>
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    <Modal show={isDisplaySuccessModel} aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Body>
                            <p className='text-success'> Add item Successfull. </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setIsDisplaySuccessModel(false)} className={`btn btn-${THEME_COLOR}`} >Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <h1 className="card-title text-center">Add item</h1>

                    {isApiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}

                    <AppInput type="text" name="Item Name" isMandatory="true" setFunction={setName} />
                    <AppInput type="text" name="Short Description" isMandatory="true" setFunction={setShortDescription} />
                    <AppInput type="textarea" name="Description" isMandatory="true" setFunction={setDescription} />
                    <AppInput type="number" name="Category Id" setFunction={setCategoriesId} />
                    <AppInput type="number" name="MRP" setFunction={setMrp} />
                    <AppInput type="number" name="Selling price" setFunction={setSellingPrice} />
                    <AppInput type="text" name="Color" setFunction={setColor} />
                    <AppInput type="text" name="Meterial" setFunction={setMeterial} />
                    <AppInput type="number" name="Length" setFunction={setLength} />
                    <AppInput type="number" name="Width" setFunction={setWidth} />
                    <AppInput type="number" name="Height" setFunction={setHeight} />

                    <label>Primary image</label>
                    <input type="file" className="form-control" name="primaryImage"
                        onChange={(e) => selectImage(e)} />
                    {primaryImageError !== "" ? <><span className="text-danger"> {primaryImageError} </span><br /></> : ""}
                    <br />


                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onClick={addItem} value="Save Item" />
                    <br />

                </form>
            </div>
        </div>
    );
}

export default AddItem;