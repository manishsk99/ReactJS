import CartItem from '../sub_components/CartItem';
import CartSummery from '../sub_components/CartSummary';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { API_BASE_URL, THEME_COLOR } from '../basic/Constants';
import { validateInputValue } from '../basic/Basic';
import WaitPage from '../basic/WaitPage';

function Cart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [cartSummary, setCartSummary] = useState({});

    useEffect(() => {
        if (localStorage.getItem("cart_items") != null) {
            let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
            // console.log("cartItems111::" + cartItemsLS);
            setCartItems(cartItemsLS);
        }
        updateCartSummery();
    }, []);

    function removeItemFromCartOpration(itemIdToDelete) {
        removeItemFromCart(itemIdToDelete);
        if (localStorage.getItem("cart_items") != null) {
            let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
            setCartItems(cartItemsLS);
        }
        props.updateCartItemCount();
        updateCartSummery();
    }

    function updateCartSummery() {
        if (localStorage.getItem("cart_items") != null) {
            let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
            let cartSummary = getCartSummery(cartItemsLS);
            setCartSummary(cartSummary);
        }
    }


    return (
        <>
            {
                props.viewOnly ?
                    <>
                        <CartItemList cartItems={cartItems} isApterPurchase="0" />
                        <div className="row mt-4">
                            <div className="col-sm-6"></div>
                            <div className="col-sm-6">
                                <CartSummery cartSummary={cartSummary} isApterPurchase="0" />
                            </div>
                        </div>
                    </>
                    :
                    <div className="h-100">
                        <Container>

                            <div className="row justify-content-center p-4 mb-3">
                                <div className="card col-sm-8 p-4">
                                    {cartItems.length === 0 ?
                                        <span>No item added in cart <Link to="/">Continue shopping</Link></span>
                                        :
                                        <>
                                            <div>
                                                <div className="row pb-3">
                                                    <div className="col-sm-6"></div>
                                                    <div className="col-sm-6"><PinCodeBox /></div>
                                                </div>
                                                <CartItemList cartItems={cartItems} removeFunction={removeItemFromCartOpration} isApterPurchase="0" />

                                                <div className="row mt-4">
                                                    <div className="col-sm-6"></div>
                                                    <div className="col-sm-6">
                                                        <CartSummery cartSummary={cartSummary} isApterPurchase="0" />
                                                        <Link className={"form-control form-control-lg btn btn-" + THEME_COLOR} to="/selectaddress" >Continue</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>

            }
        </>
    )
}

export default Cart;

export function CartItemList(props) {
    return (
        <div>
            {
                props.cartItems.map((item, key) =>
                    <CartItem key={key} itemDetail={item} removeFunction={props.removeFunction} isApterPurchase={props.isApterPurchase} />
                )
            }
        </div>
    );
}

export function getCartSummery(cartItemsList) {
    let cartSummary = {};
    if (cartItemsList != null) {
        let itemPrice = 0;
        let discAmount = 100;
        let deliveryChrg = 50;
        cartItemsList.forEach(item => {
            itemPrice = itemPrice + parseFloat(item.selling_price) * parseInt(item.quantity);
        });
        let totalAmount = (itemPrice + deliveryChrg) - discAmount;
        cartSummary = {
            "itemTotalPrice": itemPrice,
            "discountAmount": discAmount,
            "deliveryCharges": deliveryChrg,
            "totalAmount": totalAmount
        };
    }
    return cartSummary;
}

export function addToCart(item) {
    let cartItems = [];
    if (localStorage.getItem("cart_items") != null) {
        cartItems = JSON.parse(localStorage.getItem("cart_items"));
        // console.log("cartItems111::" + JSON.stringify(cartItems));
    }
    let isItemAlreadyAdded = updateCartItemQuantity(cartItems, item.id, 1, false);
    if (isItemAlreadyAdded === 0) {
        let cart_item = {
            selling_price: item.selling_price,
            mrp: item.mrp,
            item: item,
            quantity: 1
        };
        cartItems.push(cart_item);
    }
    updateLocalStorageCartItems(cartItems);

    toast.success(item.name + " added to cart", { autoClose: 2000 });
}

function updateLocalStorageCartItems(cartItems) {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    localStorage.setItem("cart_items_count", cartItems.length);
}

export function updateCartItemQuantity(cartItems, itemId, quantityToAdd, isChange) {
    if (cartItems == null) {
        cartItems = JSON.parse(localStorage.getItem("cart_items"));
    }
    let isItemAlreadyAdded = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const itemLS = cartItems[i];
        if (itemLS.item.id === itemId) {
            isItemAlreadyAdded = 1;
            if (isChange) {
                itemLS.quantity = quantityToAdd;
            } else {
                itemLS.quantity = itemLS.quantity + quantityToAdd;
            }
            break;
        }
    }
    return isItemAlreadyAdded;
}

function removeItemFromCart(itemIdToDelete) {
    if (localStorage.getItem("cart_items") != null) {
        let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
        for (let i = 0; i < cartItemsLS.length; i++) {
            const itemLS = cartItemsLS[i];
            // console.log("ids::" + itemLS.id + "," + item.id);
            if (itemLS.item.id === itemIdToDelete) {
                cartItemsLS.splice(i, 1);
                // console.log("after delete");
                break;
            }
        }
        updateLocalStorageCartItems(cartItemsLS);
    }
}

function PinCodeBox() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [pinCode, setPinCode] = useState("");
    let [pinCodeError, setPinCodeError] = useState("");
    let [pinCodeSuccess, setPinCodeSuccess] = useState("");

    useEffect(() => {
        if (localStorage.getItem("pin_code")) {
            setPinCode(localStorage.getItem("pin_code"));
            // checkPinCode();
        }
    }, []);

    function checkField(value) {
        setPinCodeError("");
        setPinCodeSuccess("");
        let isValidationError = false;
        let v = validateInputValue("text", "Pin Code", value, "required|pincode");
        if (v["is_invalid"] === true) {
            isValidationError = true;
            setPinCodeError(v["error_message"]);
        }
        return isValidationError;
    }
    function checkPinCode() {
        let isValidationError = checkField(pinCode);
        if (isValidationError) {
            return;
        }
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        setPinCodeError("");
        setPinCodeSuccess("");
        fetch(API_BASE_URL + "checkpin/" + pinCode).then(res => res.json())
            .then(
                (responseJSON) => {
                    setIsDisplayWaitPage(false);
                    // console.log("API Status:: " + JSON.stringify(responseJSON));
                    if (responseJSON["success"]) {
                        setPinCodeSuccess(responseJSON["message"]);
                        localStorage.setItem("pin_code", pinCode);
                    } else {
                        setPinCodeError(responseJSON["message"]);
                    }
                }
            );
    }
    return (
        <div>
            <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Pin Code" maxLength="6"
                    value={pinCode} onChange={(e) => setPinCode(e.target.value)}
                    onBlur={(e) => checkField(e.target.value)} />

                <button className="btn btn-outline-secondary" type="button" onClick={checkPinCode} >check</button>
            </div>
            {pinCodeError ? <span className="text-danger"> {pinCodeError} </span> : ""}
            {pinCodeSuccess ? <span className="text-success"> {pinCodeSuccess} </span> : ""}
        </div>
    );
}

export { PinCodeBox };