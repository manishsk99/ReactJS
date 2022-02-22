import { useEffect, useState } from "react";
import { Accordion, Alert, Container } from "react-bootstrap";
import { apiGetCall } from "../basic/Basic";
import WaitPage from "../basic/WaitPage";
import { CartItemList, getCartSummery } from "./Cart";
import CartSummery from '../sub_components/CartSummary';
import { AddressLebel } from "./ManageAddress";

function MyOrders() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let [apiError, setApiError] = useState("");
    let [orderList, setOrderList] = useState([]);

    useEffect(() => {
        document.title = "My Orders";

        let userId = localStorage.getItem("userId");

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        setApiError("");
        Promise.all([
            apiGetCall("orders/" + userId + "/", setOrderList, false, "OrderList_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    return (
        <Container>
            <div className="row justify-content-left">
                <div className="card col-sm-12 col-lg-12 p-3">
                    <h1 className="card-title text-center">Orders</h1>
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
                    {apiError ? <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert> : ""}
                    <Accordion>
                        {
                            orderList.length === 0 ? <>No order found. <br /><br /></> :
                            orderList.map((order, key) =>

                                <Accordion.Item eventKey={key} key={key} className="mt-3 border-top" >
                                    <Accordion.Header>
                                        {order.order_items[0].item.name}
                                        {Object.keys(order.order_items).length > 1 ? " + " + (Object.keys(order.order_items).length - 1) + " items" : ""}
                                        &nbsp;-&nbsp; <small className="text-muted">{order.created_at.split('T')[0] + " " + order.created_at.split('T')[1].split('.')[0]} </small>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <OrderDetail orderItems={order.order_items} address={order.app_user_address} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }
                    </Accordion>
                </div>
            </div>
        </Container>
    );
}

export default MyOrders;

function OrderDetail(props) {
    const [cartSummary, setCartSummary] = useState({});

    useEffect(() => {
        let cartSummary = getCartSummery(props.orderItems);
        setCartSummary(cartSummary);
    }, [props]);

    return (
        <>
            <CartItemList cartItems={props.orderItems} isAfterPurchase="1" />
            <div className="row mt-4">
                <div className="col-sm-6">
                    <CartSummery cartSummary={cartSummary} isAfterPurchase="1" />
                </div>
                <div className="col-sm-6 mt-5">
                    <AddressLebel address={props.address} readOnly="true" />
                </div>
            </div>
        </>
    );
}