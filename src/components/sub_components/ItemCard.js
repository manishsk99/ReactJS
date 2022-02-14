import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../basic/Constants';
import { addToCart } from '../ecom/Cart';
import { HeaderContext } from '../../App.js';
import { useContext, useEffect, useState } from 'react';

function ItemCard(props) {
    const updateCartItemCount = useContext(HeaderContext);
    let item = props.itemDetail;

    function addToCartOpration() {
        addToCart(item);
        updateCartItemCount();
    }

    return (
        <div className="pb-3">
            <div className="card h-100 shadow">
                <img src={IMAGE_BASE_URL + item.primary_image} className="card-img-top" alt="..." />
                <div className="card-body align-text-bottom ">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                        Item short description. <br />
                        <ItemPriceDetail mrp={item.mrp} selling_price={item.selling_price} isCard={true} />
                    </p>
                    <div className="row">
                        <div className="col-4">
                            <Link className="stretched-link" to={"itemDetail/" + item.id}>view</Link>
                        </div>
                        <div className="col-8 text-end">
                            <Button variant="primary" onClick={addToCartOpration} style={{ position: 'relative', zIndex: 2 }} >Add to cart</Button>
                        </div>
                    </div>
                </div>
                {/*
                    <div className="card-footer">
                        <small className="text-muted"></small>
                    </div> 
                */}
            </div>
        </div>
    )
}

export default ItemCard;

export function ItemPriceDetail(props) {
    let [percent, setPersent] = useState(0);

    useEffect(() => {
        setPersent(Math.round(((props.mrp - props.selling_price) / props.mrp) * 100));
    }, [props]);

    return (
        <>
            <span>
                <strong className={props.isCard === true ? "" : "fs-4"}>&#x20B9; {props.selling_price}</strong>&nbsp;
                <strike className="text-muted">&#x20B9; {props.mrp}</strike>&nbsp;
                {percent > 1 ? <strong className="text-success">{percent}% off</strong> : ""}
            </span>
        </>
    )
}