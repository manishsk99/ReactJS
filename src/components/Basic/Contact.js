import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import {BRAND_NAME} from './Constants';
function Contact() {
    useEffect(() => {
        document.title = "Contact Us";
      }, []);
    return (
        <Container>
            <div className="row p-4">
                <div className="card col-lg-6 offset-lg-2 p-4">
                    <h1 className="card-title text-center">Contact Us</h1>
                    <strong>{BRAND_NAME}</strong>
                    <p className="card-text">
                        Yadav Chak, Bhitari modh, <br />
                        Near - Dr. Jagdish Prashad Homeopathic clinic.<br />
                        Saidpur-Ghazipur, UP, India-233304<br /><br />
                        <strong>Email:</strong> manishsk99@gmail.com <br />
                        <strong>Phone:</strong> 9990921066
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default Contact;