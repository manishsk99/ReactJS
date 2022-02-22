import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../basic/Constants";
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
                            {props.isAfterPurchase? cartItem.quantity : <QuantityElement quantity={cartItem.quantity} />}
                            
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

    useEffect(() => {
        if (props.quantity) {
            setQuantity(props.quantity);
        }
    }, [props]);

    function changeQuantity(quantityToAdd) {
        let q = quantity + quantityToAdd;
        if (q < 0) {
            q = 0;
        }
        setQuantity(q);

    }
    return (
        <div className="input-group mb-3 border">
            <button className="btn btn-outline-secondary" type="button"
                onClick={() => changeQuantity(-1)} >-</button>
            <input type="text" className="form-control" value={quantity} maxLength={2} disabled />
            <button className="btn btn-outline-secondary" type="button"
                onClick={() => changeQuantity(1)} >+</button>
        </div>
    )
}