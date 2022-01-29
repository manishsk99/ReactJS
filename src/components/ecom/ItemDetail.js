import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../basic/Constants";
import { ItemPriceDetail } from "../sub_components/ItemCard";

function ItemDetail() {
    let [item, setItem] = useState({});

    useEffect(() => {
        if (localStorage.getItem("cart_items") != null) {
            let cartItemsLS = JSON.parse(localStorage.getItem("cart_items"));
            console.log("cartItems111::" + cartItemsLS);
            if (cartItemsLS.length > 0)
                setItem(cartItemsLS[0]);
        }
    }, [])

    return (
        <Container className="pt-4 pb-4">
            <div className="row w-100">
                <div className="col-sm-6">
                    <div className="mt-3">
                        <img src={IMAGE_BASE_URL + item.primary_image} className="w-100" alt="..." />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="mt-3">
                        <h2>{item.name}</h2>

                        <h5 className = "text-muted">{item.short_description}</h5>
                        <br />

                        <ItemPriceDetail mrp={item.mrp} selling_price={item.selling_price} />

                        <br />
                        <br />
                        <br />
                        <h5 className = "text-muted">Description</h5>
                        <p>{item.description}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan={2} ><h5 className = "text-muted">General Details</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.color ?
                                    <tr>
                                        <td>Metarial</td>
                                        <td>{item.color}</td>
                                    </tr>
                                    : ""}
                                {item.metarial ?
                                    <tr>
                                        <td>Metarial</td>
                                        <td>{item.metarial}</td>
                                    </tr>
                                    : ""}
                                {item.length ?
                                    <tr>
                                        <td>Length</td>
                                        <td>{item.length}</td>
                                    </tr>
                                    : ""}
                                {item.width ?
                                    <tr>
                                        <td>Width</td>
                                        <td>{item.width}</td>
                                    </tr>
                                    : ""}
                                {item.height ?
                                    <tr>
                                        <td>Height</td>
                                        <td>{item.height}</td>
                                    </tr>
                                    : ""}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ItemDetail;