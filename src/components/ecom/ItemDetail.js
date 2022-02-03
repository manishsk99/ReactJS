import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HeaderContext } from "../../App";
import { apiGetCall } from "../basic/Basic";
import { IMAGE_BASE_URL } from "../basic/Constants";
import WaitPage from "../basic/WaitPage";
import { ItemPriceDetail } from "../sub_components/ItemCard";
import { addToCart, PinCodeBox } from "./Cart";

function ItemDetail() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [item, setItem] = useState({});
    const {itemId} = useParams();
    
    const updateCartItemCount = useContext(HeaderContext);
    function addToCartOpration() {
        addToCart(item);
        updateCartItemCount();
    }

    useEffect(() => {
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("items/" + itemId, setItem, false, "item_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, [itemId])

    return (
        <Container className="pt-4 pb-4">
            <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
            <div className="row w-100">
                <div className="col-sm-6">
                    <div className="mt-3">
                        <img src={item.primary_image ? IMAGE_BASE_URL + item.primary_image :""} className="w-100" alt="..." />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="mt-3">
                        <h2>{item.name}</h2>

                        <h5 className = "text-muted">{item.short_description}</h5>
                        <br />

                        <ItemPriceDetail mrp={item.mrp} selling_price={item.selling_price} />

                        <br />
                        <div className="row mt-5">
                            <div className="col-6">
                                <PinCodeBox />
                            </div>
                        </div>
                        
                        <div className="row mt-3 mb-4">
                            <div className="col-3">
                                <Button variant="warning" onClick={addToCartOpration} >Buy Now</Button>
                            </div>
                            <div className="col-3 text-end">
                                <Button variant="primary" onClick={addToCartOpration} >Add to cart</Button>
                            </div>
                        </div>
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
                                    : <tr />}
                                {item.metarial ?
                                    <tr>
                                        <td>Metarial</td>
                                        <td>{item.metarial}</td>
                                    </tr>
                                    : <tr />}
                                {item.length ?
                                    <tr>
                                        <td>Length</td>
                                        <td>{item.length}</td>
                                    </tr>
                                    : <tr />}
                                {item.width ?
                                    <tr>
                                        <td>Width</td>
                                        <td>{item.width}</td>
                                    </tr>
                                    : <tr />}
                                {item.height ?
                                    <tr>
                                        <td>Height</td>
                                        <td>{item.height}</td>
                                    </tr>
                                    : <tr />}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ItemDetail;