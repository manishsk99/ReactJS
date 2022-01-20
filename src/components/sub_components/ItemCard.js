import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../basic/Constants';
import { addToCart } from '../ecom/Cart';
import {HeaderContext} from '../../App.js';
import { useContext } from 'react';

function ItemCard(props) {
    const updateCartItemCount = useContext(HeaderContext);
    let item = props.itemDetail;

    function addToCartOpration () {
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
                        <span><strong>&#x20B9; {item.mrp}</strong>
                            <strike className="text-muted">&#x20B9; {item.selling_price}</strike></span>
                    </p>
                    <div className="row">
                        <div className="col-4">
                            <Link to={"itemDetail/" + item.id}>view</Link>
                        </div>
                        <div className="col-8 text-end">
                            <Button variant="primary" onClick={addToCartOpration} >Add to cart</Button>
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