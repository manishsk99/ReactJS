import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetCall } from "../basic/Basic";
import { IMAGE_BASE_URL } from "../basic/Constants";
import WaitPage from "../basic/WaitPage";
import ItemCardsList from '../sub_components/ItemCardsList';

function ManageItem() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [items, setitems] = useState([]);

    useEffect(() => {
        document.title = "Manage Items";
        let sellerId = localStorage.getItem("sellerId");
        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("sitems/" + sellerId, setitems, false, "seller_items_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );

    }, []);

    return (
        <>
            <div className="row justify-content-left">
                <div className="card col-12 p-2">
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
                    <h1 className="card-title text-center">Manage Items</h1>
                    <hr />
                    <div className="d-flex">
                        <div className="p-1 flex-grow-1"><Link to="/additem">Add New Item</Link></div>
                        <div className="p-1 me-2"><Link to="#">Download</Link></div>
                        <div className="p-1 "><Link to="#">Print</Link></div>
                    </div>
                    {items.length === 0
                        ? <><br />No items added yet <br /><br /></>
                        : <ItemCardsList data={items} />
                    }
                </div>
            </div>
        </>

    );
}

export default ManageItem;

export function ItemListTable(props) {
    return (
        <div className="overflow-auto">
            {
                props.items.length === 0 ? <><br />No items added yet <br /><br /></> :
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Short description</th>
                                <th scope="col">Description</th>
                                <th scope="col">Category</th>
                                <th scope="col">Color</th>
                                <th scope="col">Meterial</th>
                                <th scope="col">Length</th>
                                <th scope="col">Width</th>
                                <th scope="col">Height</th>
                                <th scope="col">Height</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.items.map((item, key) =>
                                <tr key={key}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.short_description}</td>
                                    <td><span className="d-inline-block text-truncate" style={{ maxWidth: "150px" }}>{item.description}</span></td>
                                    <td>{item.categories.name}</td>
                                    <td>{item.color}</td>
                                    <td>{item.meterial}</td>
                                    <td>{item.length}</td>
                                    <td>{item.width}</td>
                                    <td>{item.height}</td>
                                    <td><img src={IMAGE_BASE_URL + item.primary_image} className="" alt={item.name} /></td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}