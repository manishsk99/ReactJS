import { useState } from 'react';
import { Link } from 'react-router-dom';
import { THEME_COLOR } from './Constants';

function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    function doSignup(e) {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
    }
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <form>
                    <h1 className="card-title text-center">Signup</h1>
                    <input type="text" className="form-control" placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)} required />
                    <br />
                    <input type="email" className="form-control" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} required />
                    <br />

                    <input type="password" className="form-control" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} required />
                    <br />
                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onSubmit={(e) => doSignup(e)} value="Signup" />
                    <br />
                    <br />
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;