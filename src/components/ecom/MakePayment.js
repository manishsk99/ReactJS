import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiGetCall } from "../basic/Basic";
import { API_BASE_URL, THEME_COLOR } from "../basic/Constants";
import WaitPage from "../basic/WaitPage";
import PaymentOption from "../payment/PaymentOption";
import Cart from "./Cart";
import { AddressLebel } from "./ManageAddress";

function MakePayment() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [apiError, setApiError] = useState("");
    let navigate = useNavigate();

    let [addressList, setAddressList] = useState([]);
    let [selectedPaymentOption, setSelectedPaymentOption] = useState(0);


    useEffect(() => {
        document.title = "Make Payment";

        let userId = localStorage.getItem("userId");
        let selectedAddressId = localStorage.getItem("selectedAddressId");

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("useraddresses/" + userId + "/" + selectedAddressId, setAddressList, false, "AddressList_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    function placeOrder() {
        let url = "saveorder";
        let reqType = "POST";
        let data = {
            users_id: localStorage.getItem('userId'),
            user_address_id: localStorage.getItem("selectedAddressId"),
            item_list: JSON.parse(localStorage.getItem("cart_items")),
            payment_option: selectedPaymentOption
        };

        setApiError("");
        if (selectedPaymentOption === 0) {
            setApiError("Please select payment option.");
            return;
        }

        let dataJson = JSON.stringify(data);

        // console.log(dataJson);

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + url, {
            method: reqType,
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
                        let orderId = responseJSON["data"].id;
                        console.log("orderId:: " + orderId);
                        navigate("/orderconfirm");
                    } else {
                        setApiError("Some error occurred.");
                        if (responseJSON["success"] === false) {
                            setApiError(responseJSON["message"]);
                        }
                    }
                },
                (error) => {
                    // console.log(error);
                    setIsDisplayWaitPage(false);
                    setApiError("Some error occurred.");
                }
            );
    }

    return (
        <Container>
            <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

            <div className="row justify-content-center mb-3 mt-3">
                <div className="col-sm-8 card p-3">
                    <h1 className="card-title text-center">Make Payment</h1>
                    {apiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}
                    <Accordion defaultActiveKey="2">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Item Details</Accordion.Header>
                            <Accordion.Body>
                                <Cart viewOnly />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="2">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Address Details</Accordion.Header>
                            <Accordion.Body>
                                {
                                    addressList.length > 0 ? <AddressLebel address={addressList[0]} /> : ""
                                }

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <PaymentOption setSelectedPaymentOption={setSelectedPaymentOption} />

                    <div className="row mt-3">
                        <div className="col-sm-8 col-lg-9"></div>
                        <div className="col-sm-4 col-lg-3">
                            <Button className={"form-control form-control-lg btn btn-" + THEME_COLOR}
                                onClick={placeOrder} >Comfirm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default MakePayment;