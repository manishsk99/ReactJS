import {Button} from 'react-bootstrap';
import { IMAGE_BASE_URL } from '../basic/Constants';

function ItemCard(props) {
    let item = props.itemDetail;
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
                            <Button className="btn btn-outline-primary">view</Button>
                        </div>
                        <div className="col-8 text-end">
                            <Button className="btn btn-primary ">Add to cart</Button>
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