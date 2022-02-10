import { CloseButton } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../basic/Constants";

function CardItem(props) {
    let item = props.itemDetail;

    function removeItemFunction() {
        props.removeFunction(item.id);
    }

    return (
        <div className="card sm-3 mt-3 shadow">
            {props.removeFunction ? <CloseButton className="position-absolute top-0 end-0" onClick={removeItemFunction} /> : ""}
            <div className="row g-0">
                <div className="col-sm-2">
                    <img src={IMAGE_BASE_URL + item.primary_image} className="cart-img img-fluid rounded-start" alt={item.name} />
                </div>
                <div className="col-sm-6">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.short_description}</p>
                    </div>
                </div>
                <div className="col-sm-4 text-end">
                    <div className="card-body">
                        <strong>&#x20B9; {item.selling_price}</strong> <br />
                        <strike className="text-muted">&#x20B9; {item.mrp}</strike>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardItem;