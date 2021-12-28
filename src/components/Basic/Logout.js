import { Link } from 'react-router-dom';
import {useEffect} from 'react';

function Logout() {
    useEffect(() => {
        document.title = "Logout";
      }, []);
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <h1 className="card-title text-center">Logout successfull</h1>
                <br />
                <br />
                <Link className="text-center" to="/">Go to home page</Link>
            </div>
        </div>
    )
}

export default Logout;