import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <h1 className="card-title text-center">Login</h1>
                <input type="text" className="form-control" placeholder="Email" />
                <br />
                <input type="password" className="form-control" placeholder="Password" />
                <br />
                <Button>Login</Button>
                <br />
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                <Link to="/forgetPassword">Forgot your password?</Link>
            </div>
        </div>
    )
}

export default Login;