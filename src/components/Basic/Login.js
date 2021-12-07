import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { THEME_COLOR } from './Constants';

function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    function doLogin(e) {
        e.preventDefault();

        console.log(email);
        console.log(password);
    }
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <form>
                    <h1 className="card-title text-center">Login</h1>

                    <input type="email" className="form-control" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} required />
                    <br />

                    <input type="password" className="form-control" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} required />
                    <br />

                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit" 
                    onSubmit={(e) => doLogin(e)} value="Login" />
                    <br />

                    <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                    <Link to="/forgetPassword">Forgot your password?</Link>
                </form>
                
            </div>
        </div>
    )
}

export default Login;