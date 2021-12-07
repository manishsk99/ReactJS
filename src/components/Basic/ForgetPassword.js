import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ForgetPassword() {
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <h1 className="card-title text-center">Forget Password</h1>
                <input type="text" className="form-control" placeholder="Email" />
                <br />
                <Button>Submit</Button>
                <br />
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>
        </div>
    )
}

export default ForgetPassword;