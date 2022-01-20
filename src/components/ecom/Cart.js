import CartItem from '../sub_components/CartItem';
import CartSummery from '../sub_components/CartSummary';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
            let itemPrice = 0;
            let discAmount = 100;
            let deliveryChrg = 50;
            cartItemsLS.forEach(item => {
                itemPrice = itemPrice + parseFloat(item.selling_price);
            });
            let totalAmount = (itemPrice + deliveryChrg) - discAmount;
            let cartSummary = {
                "itemTotalPrice": itemPrice,
                "discountAmount": discAmount,
                "deliveryCharges": deliveryChrg,
                "totalAmount": totalAmount
            };
            setCartSummary(cartSummary);
        }
    }

    return (
        <div className="bg-light">
            <Container>
                <div className="mb-3">
                    <div className="row">
                        {cartItems.length === 0 ?
                            <div className="row justify-content-center p-4">
                                <div className="card col-sm-8 col-lg-4 p-4">
                                    <span>No item added in cart <Link to="/">Continue shopping</Link></span>
                                </div>
                            </div>
                            :
                            <>
                                <div className="col-sm-8 pt-5">
                                    {
                                        cartItems.map((item, key) =>
                                            <CartItem key={key} itemDetail={item} removeFunction={removeItemFromCartOpration} />
                                        )
                                    }
                                </div>
                                <div className="col-sm-4">
                                    <CartSummery cartSummary={cartSummary} />
                                </div>
                            </>
                        }

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart;

export function addToCart(item) {
    let cartItems = [];
    if (localStorage.getItem("cart_items") != null) {
        cartItems = JSON.parse(localStorage.getItem("cart_items"));
        // console.log("cartItems111::" + JSON.stringify(cartItems));
    }
    let isItemAlreadyAdded = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const itemLS = cartItems[i];
        if (itemLS.id === item.id) {
            isItemAlreadyAdded = 1;
            break;
        }
    }
    if (isItemAlreadyAdded === 0) {
        cartItems.push(item);
    }
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    localStorage.setItem("cart_items_count", cartItems.length);

    toast.success(item.name + " added to cart", { autoClose: 2000 });
}

function removeItemFromCart(itemIdToDelete) {
    if (localStorage.getItem("cart_items") != null) {
        let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
        for (let i = 0; i < cartItemsLS.length; i++) {
            const itemLS = cartItemsLS[i];
            // console.log("ids::" + itemLS.id + "," + item.id);
            if (itemLS.id === itemIdToDelete) {
                cartItemsLS.splice(i, 1);
                // console.log("after delete");
                break;
            }
        }
        localStorage.setItem("cart_items", JSON.stringify(cartItemsLS));
        localStorage.setItem("cart_items_count", cartItemsLS.length);
    }
}