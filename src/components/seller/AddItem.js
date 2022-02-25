import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateInputValue, apiGetCall } from "../basic/Basic";
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
    let [categoriesList, setCategoriesList] = useState([]);

    let [primaryImage, setPrimaryImage] = useState(null);
    let [primaryImageError, setPrimaryImageError] = useState("");
    let [otherImage, setOtherImage] = useState(null);
    let [otherImageError, setOtherImageError] = useState("");
    let navigate = useNavigate();

    let [inputProps] = useState({
        name: { type: "text", name: "Item Name", rule: "required", setFunction: setName },
        short_description: { type: "text", name: "Short Description", rule: "required", setFunction: setShortDescription },
        description: { type: "textarea", name: "Description", rule: "required|min:2|max:1000", setFunction: setDescription },
        categories_id: { type: "select", name: "Category", rule: "required", setFunction: setCategoriesId, items: categoriesList },
        mrp: { type: "number", name: "MRP", rule: "required|numberOnly", setFunction: setMrp },
        selling_price: { type: "number", name: "Selling price", rule: "required|numberOnly", setFunction: setSellingPrice },
        color: { type: "text", name: "Color", rule: "required", setFunction: setColor },
        meterial: { type: "text", name: "Meterial", rule: "required", setFunction: setMeterial },
        length: { type: "text", name: "Length", setFunction: setLength, nameSuffix: "(cm)" },
        width: { type: "text", name: "Width", setFunction: setWidth, nameSuffix: "(cm)" },
        height: { type: "text", name: "Height", setFunction: setHeight, nameSuffix: "(cm)" }
    });
    let [title, setTitle] = useState("Add Item");

    useEffect(() => {
        document.title = "Add Item";
        setTitle("Add Item");
        setIsApiError(false);
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("categories", setCategoriesList, true, "categories_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    function formHandling(e) {
        e.preventDefault();
    }

    function selectImage(e) {
        let file = e.target.files[0];
        setPrimaryImage(file);
    }

    function selectOtherImage(e) {
        let files = e.target.files;
        // console.log(files);
        setOtherImage(files);
    }

    function checkValues(formData) {
        let isValidationError = false;
        for (let key in inputProps) {
            let value = inputProps[key];
            // console.log("key:" + key + "," + value);
            let v = validateInputValue(value.type, value.name, formData.get(key), value.rule);
            if (v["is_invalid"] === true) {
                isValidationError = true;
                setApiError(v["error_message"]);
                return isValidationError;
            }
        }
        return isValidationError;
    }

    function addItem() {
        let formData = new FormData();
        formData.append("sellers_id", localStorage.getItem("sellerId"));
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
        formData.append("primary_image", primaryImage);
        if (otherImage !== null) {
            for (var i = 0; i < otherImage.length; i++) {
                formData.append("other_images[]", otherImage[i]);
            }
        }
        // console.log(formData.get("other_images"));
        setIsApiError(false);
        setPrimaryImageError("");
        setOtherImageError("");
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
        if(sellingPrice > mrp) {
            setApiError("Selling price should be less then on equal to mrp.");
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

    function closeSuccessModel() {
        setIsDisplaySuccessModel(false)
        navigate('/manageitem');
    }

    return (
        <div className="row justify-content-left">
            <div className="card col-sm-8 col-lg-6">
                <form onSubmit={formHandling}>
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    <Modal show={isDisplaySuccessModel} aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Body>
                            <p className='text-success'> {title} Successfull. </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={closeSuccessModel} className={`btn btn-${THEME_COLOR}`} >Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <h1 className="card-title text-center">{title}</h1>

                    {isApiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}

                    {Object.keys(inputProps).map((field, key) =>
                        field === "categories_id" ?
                            <AppInput key={key}
                                type={inputProps[field].type}
                                name={inputProps[field].name}
                                setFunction={inputProps[field].setFunction}
                                validationRule={inputProps[field].rule}
                                items={categoriesList}
                                nameSuffix={inputProps[field].nameSuffix}
                            // defaultValue={isEditAddress ? addressDetail[field] : ""}
                            />
                            :
                            <AppInput key={key}
                                type={inputProps[field].type}
                                name={inputProps[field].name}
                                setFunction={inputProps[field].setFunction}
                                validationRule={inputProps[field].rule}
                                //   items={inputProps[field].items}
                                nameSuffix={inputProps[field].nameSuffix}
                            // defaultValue={isEditAddress ? addressDetail[field] : ""}
                            />
                    )
                    }

                    <label>Primary image (Only jpg, jpeg or png)*</label>
                    <input type="file" className="form-control" name="primaryImage"
                        onChange={(e) => selectImage(e)} accept="image/*" />
                    {primaryImageError !== "" ? <><span className="text-danger"> {primaryImageError} </span><br /></> : ""}
                    <br />

                    <label>Other images (Only jpg, jpeg or png)</label>
                    <input type="file" className="form-control" name="otherImages"
                        onChange={(e) => selectOtherImage(e)} accept="image/*" multiple="multiple" />
                    {otherImageError !== "" ? <><span className="text-danger"> {otherImageError} </span><br /></> : ""}
                    <br />

                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onClick={addItem} value={title} />
                    <br />

                </form>
            </div>
        </div>
    );
}

export default AddItem;