import { useState } from 'react';
import { Link } from 'react-router-dom';
import { THEME_COLOR } from './Constants';

function ForgetPassword() {
    let [email, setEmail] = useState("");

    function checkForgetPassword(e) {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="row justify-content-center p-4">
            <div className="card col-sm-8 col-lg-4 p-4">
                <form>
                    <h1 className="card-title text-center">Forget Password</h1>
                    
                    <input type="email" className="form-control" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <input className={`form-control btn btn-${THEME_COLOR}`} type="submit"
                        onSubmit={(e) => checkForgetPassword(e)} value="Signup" />
                    <br />
                    <span>Don't have an account? <Link to="/signup">Signup</Link></span><br />
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;