import { useContext, useEffect, useState } from "react";
import { Button, CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../basic/Constants";
import { CartContext, updateCartItemQuantity } from "../ecom/Cart";
import { ItemPriceDetail } from "./ItemCard";

function CardItem(props) {
    const [mrp, setMrp] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);

    let cartItem = props.itemDetail;
    let item = cartItem.item;

    function removeItemFunction() {
        props.removeFunction(item.id);
    }

    useEffect(() => {
        if (props.isAfterPurchase) {
            setSellingPrice(cartItem.selling_price);
            setMrp(cartItem.mrp);
        } else {
            setSellingPrice(item.selling_price);
            setMrp(item.mrp);
        }
    }, [props, cartItem, item]);

    return (
        <div className="sm-3 mt-3 shadow p-1 border">
            <div className="card border-0">
                {props.removeFunction ? <CloseButton className="position-absolute top-0 end-0" onClick={removeItemFunction} /> : ""}
                <div className="row g-0">
                    <div className="col-sm-2">
                        <img src={IMAGE_BASE_URL + item.primary_image} className="cart-img img-fluid rounded-start" alt={item.name} />
                    </div>
                    <div className="col-sm-6">
                        <div className="card-body">
                            <div>
                                <span className="card-title h5">{item.name} - </span>
                                <span className="card-text text-muted h6">{item.short_description}</span>
                            </div>
                            <ItemPriceDetail mrp={mrp} selling_price={sellingPrice} isCard={true} />
                        </div>
                    </div>
                    <div className="col-sm-4 text-end">
                        <div className="card-body">
                            {props.isAfterPurchase 
                                ? <><span className="text-muted" >quantity:</span> <span>{cartItem.quantity}</span></> 
                                : <QuantityElement quantity={cartItem.quantity} itemsid={item.id} />}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardItem;

export function QuantityElement(props) {
    const [quantity, setQuantity] = useState(1);
    const [initialValueAssigned, setInitialValueAssigned] = useState(0);
    const updateCartSummery = useContext(CartContext);

    useEffect(() => {
        if (props.quantity && initialValueAssigned === 0) {
            // console.log('setting here');
            setQuantity(props.quantity);
            setInitialValueAssigned(1);
        }
    }, [props, initialValueAssigned]);

    function changeQuantity(quantityToAdd) {
        let q = quantity + quantityToAdd;
        if (q < 1) {
            q = 1;
        } else if (q > 5) {
            q = 5;
        }
        // console.log('props.itemsid:: ' + props.itemsid);
        updateCartItemQuantity(null, props.itemsid, q, 1);
        updateCartSummery();
        setQuantity(q);
    }
    return (
        <div>
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip id="tooltip" {...props}>
                        Quantity
                    </Tooltip>
                }
            >
                <div className="input-group w-75 mb-3">
                    <Button variant="outline-secondary" className="rounded-circle"
                        onClick={() => changeQuantity(-1)} disabled={quantity <= 1 ? true : false } >
                            <strong>-</strong>
                    </Button>
                    <div className="border border-secondary align-baseline p-1 ps-3 pe-3"> {quantity} </div>
                    <Button variant="outline-secondary" className="rounded-circle" type="button"
                        onClick={() => changeQuantity(1)} disabled={quantity >= 5 ? true : false } >
                            <strong>+</strong>
                    </Button>
                </div>
            </OverlayTrigger>

        </div>
    )
}