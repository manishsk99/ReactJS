import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetCall } from "../basic/Basic";
import WaitPage from "../basic/WaitPage";

function ManageAddress(props) {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [, setSelectedAddressId] = useState(0);
    useEffect(() => {
        document.title = "Manage Address";
        setIsDisplayWaitPage(false);
        setWaitPageProgress(50);
    }, []);

    return (
        <>
            <div className="row justify-content-left">
                <div className="card col-sm-8 col-lg-6">
                    <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                    <h1 className="card-title text-center">Manage Address</h1>
                    <hr />
                    <AddressList isDisplayRadio="false" setAddressToParent={setSelectedAddressId} />

                </div>
            </div>
        </>
    );
}

export default ManageAddress;

export function AddressList(props) {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [, setSelectedAddressId] = useState(0);
    let [addressList, setAddressList] = useState([]);
    useEffect(() => {

        let userId = localStorage.getItem("userId");

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        Promise.all([
            apiGetCall("useraddresses/" + userId, setAddressList, false, "AddressList_json")
        ]).then(
            () => {
                setIsDisplayWaitPage(false);
            }
        );
    }, []);

    function choseAddress(e) {
        // console.log("id: " + e.target.value);
        setSelectedAddressId(e.target.value);
        props.setAddressToParent(e.target.value);
    }

    return (
        <>
            <div>
                <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                {
                    addressList.length === 0 ? "Address not added yet." :
                        addressList.map((address, key) =>
                            <div key={key}>
                                <div className="form-check">
                                    {props.isDisplayRadio === "true" ?
                                        <input className="form-check-input" type="radio" value={address.id} id="address" name="address"
                                            onChange={choseAddress} /> : ""
                                    }

                                    <AddressLebel address={address} returnTo={props.returnTo}/>
                                </div>
                                <hr />
                            </div>
                        )
                }

                <Link to="/addaddress" state={{ returnTo: props.returnTo }}>Add New Address</Link>
                <hr />
            </div>
        </>
    );
}

export function AddressLebel({address, ...props}) {

    return (
        <label className="form-check-label" htmlFor="address">
            <div>
                <strong>{address.name} </strong>
                <span className="badge bg-secondary">{address.type === 1 ? "Home" : "Work"}</span>&nbsp;
                <Link to="/addaddress" state={{ addressDetail: address, returnTo: props.returnTo }} >Edit</Link>
                <p>{address.address1}, {address.address2 ? address.address2 + "," : ""} {address.landmark} <br />
                    {address.city}, {address.state} - {address.pin_code} <br />
                    Phone : {address.phone}
                </p>
            </div>
        </label>
    );
}