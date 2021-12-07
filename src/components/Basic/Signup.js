import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <h1 className="card-title text-center">Signup</h1>
                <input type="text" className="form-control" placeholder="Full Name" />
                <br />
                <input type="text" className="form-control" placeholder="Email" />
                <br />
                <input type="password" className="form-control" placeholder="Password" />
                <br />
                <Button>Signup</Button>
                <br />
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>
        </div>
    )
}

export default Signup;