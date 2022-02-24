import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { apiGetCall } from "../basic/Basic";
import WaitPage from "../basic/WaitPage";

function SellerProfile() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [apiError, setApiError] = useState("");

    let [sellerData, setSellerData] = useState({});

    useEffect(() => {
        document.title = "Seller Profile";
        let sellerId = localStorage.getItem("sellerId");
        setApiError("");
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("sdetail/" + sellerId, setSellerData, false, "seller_detail_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    return (
        <div className="card col-lg-6 offset-lg-2 p-4">
            <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
            {apiError ? <Alert key="danger" variant="danger">
                {apiError}
            </Alert> : ""}

            <h1 className="card-title text-center">My Profile</h1>
            <br />
            <h4>{sellerData.name}</h4>
            <p className="card-text">
                <strong>Email:</strong> {sellerData.email} <br />
                <strong>Phone:</strong> {sellerData.phone} <br />
            </p>
        </div>
    );
}

export default SellerProfile;