import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { apiGetCall } from "../basic/Basic";
import WaitPage from "../basic/WaitPage";
import { AddressLebel } from "../ecom/ManageAddress";
import AppError from "../sub_components/AppError";

function SellerOrder() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [apiError, setApiError] = useState("");

    let [sellerOrders, setSellerOrders] = useState([]);

    useEffect(() => {
        document.title = "Seller Profile";
        let sellerId = localStorage.getItem("sellerId");
        setApiError("");
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("sorderitems/" + sellerId, setSellerOrders, false, "seller_orders_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    return (
        <>
            <div className="card p-4">
                <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
                <AppError errorText={apiError} />

                <h1 className="card-title text-center">My Orders</h1>
                <hr />

                <div className="d-grid gap-3">
                    {
                        sellerOrders.length === 0 ? "No order received." :
                            sellerOrders.map((orderItem, key) =>
                                <div>
                                    <AppCollapse key={key}
                                        heading={
                                            <div className="d-flex">
                                                <div className="p-1 flex-grow-1">{orderItem.item.name + " - " + orderItem.quantity}</div>
                                                <div className="p-1 text-success">{orderItem.order_status.name}</div>
                                            </div>
                                        }
                                        content={
                                            <AddressLebel address={orderItem.orders.app_user_address
                                            } readOnly />}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default SellerOrder;


export function AppCollapse({ heading, content }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="border shadow-sm p-2"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                {heading}
            </div>
            <Collapse in={open}>
                <div id="example-collapse-text" className="border p-2">
                    {content}
                </div>
            </Collapse>
            <></>
        </>
    );
}