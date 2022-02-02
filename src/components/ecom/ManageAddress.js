import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetCall } from "../basic/Basic";

function ManageAddress(props) {
    let [addressList, setAddressList] = useState([]);
    useEffect(() => {
        document.title = "Manage Address";
        let userId = localStorage.getItem("userId");
        apiGetCall("useraddresses/" + userId, setAddressList, false, "AddressList_json");

    }, []);

    return (
        <>
            <div className="row justify-content-left">
                <div className="card col-sm-8 col-lg-6">
                    <h1 className="card-title text-center">Manage Address</h1>
                    <hr />
                    {
                        addressList.length === 0 ? "Address not added yet." :
                            addressList.map((address, key) =>
                                <div key={key}>
                                    <div className="form-check">
                                        {props.isDisplayRadio ?
                                            <input className="form-check-input" type="radio" value={address.id} id="address" name="address" /> : ""
                                        }

                                        <label className="form-check-label" htmlFor="address">
                                            <div>
                                                <strong>{address.name} </strong>
                                                <span className="badge bg-secondary">{address.type === 1 ? "Home" : "Work"}</span>&nbsp;
                                                <Link to="/addaddress" state={{ addressDetail: address, returnTo:props.returnTo }} >Edit</Link>
                                                <p>{address.address1}, {address.address2 ? address.address2 + "," : ""} {address.landmark} <br />
                                                    {address.city}, {address.state} - {address.pin_code} <br />
                                                    Phone : {address.phone}
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                            )
                    }

                    <Link to="/addaddress" state={{returnTo:props.returnTo}}>Add New Address</Link>
                    <hr />
                </div>
            </div>
        </>
    );
}

export default ManageAddress;
