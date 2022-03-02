import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import { useParams, useNavigate } from "react-router-dom";
import { HeaderContext } from "../../App";
import { apiGetCall } from "../basic/Basic";
import { IMAGE_BASE_URL } from "../basic/Constants";
import WaitPage from "../basic/WaitPage";
import { ItemPriceDetail } from "../sub_components/ItemCard";
import { addToCart, PinCodeBox } from "./Cart";

function ItemDetail() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);
    let navigate = useNavigate();

    let [item, setItem] = useState({});
    const [imageList, setImageList] = useState([]);;

    const { itemId } = useParams();

    const updateCartItemCount = useContext(HeaderContext);
    function addToCartOpration() {
        addToCart(item);
        updateCartItemCount();
    }

    function buyNow() {
        addToCartOpration();
        navigate("/cart");
    }

    useEffect(() => {

        function setItemDetailAPI(itemByAPI) {
            setItem(itemByAPI);
            if (itemByAPI.other_images) {
                const imgArr = itemByAPI.other_images.split(",");
                const imgList = [{
                    original: IMAGE_BASE_URL + itemByAPI.primary_image,
                    thumbnail: IMAGE_BASE_URL + itemByAPI.primary_image,
                }];
                imgArr.forEach((img) => {
                    const obj = {
                        original: IMAGE_BASE_URL + img,
                        thumbnail: IMAGE_BASE_URL + img,
                    };
                    imgList.push(obj);
                });
                setImageList(imgList);
            }
        }

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("items/" + itemId, setItemDetailAPI, false, "item_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, [itemId]);


    return (
        <Container className="pt-4 pb-4">
            <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
            <div className="row w-100">
                <div className="col-sm-6">
                    <div className="mt-3">
                        <ImageGallery items={imageList} autoPlay={true} />
                    </div>

                </div>
                <div className="col-sm-6">
                    <div className="mt-3">
                        <h2>{item.name}</h2>

                        <h5 className="text-muted">{item.short_description}</h5>
                        <br />

                        <ItemPriceDetail mrp={item.mrp} selling_price={item.selling_price} />

                        <br />
                        <div className="row mt-5">
                            <div className="col-6">
                                <PinCodeBox />
                            </div>
                        </div>

                        <div className="row mt-3 mb-4">
                            <div className="col-3 col-sm-6">
                                <Button variant="warning" onClick={buyNow} >Buy Now</Button>
                            </div>
                            <div className="col-3 col-sm-6 text-end">
                                <Button variant="primary" onClick={addToCartOpration} >Add to cart</Button>
                            </div>
                        </div>
                        <h5 className="text-muted">Description</h5>
                        <p>{item.description}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan={2} ><h5 className="text-muted">General Details</h5></th>
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