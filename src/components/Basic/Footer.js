import { Container} from 'react-bootstrap';
import './Basic.css';
import {BRAND_NAME, THEME_COLOR} from './Constants';

function Footer() {
    return (
        <>
            <div className={`bg-${THEME_COLOR} text-white w-100 p-4 position-absolute bottom-0`}>
                <Container className="position-relative">
                    <div className="position-absolute translate-middle-y start-0">
                        @2021 {BRAND_NAME}. All rights reserved.
                    </div>
                    <div className="position-absolute translate-middle-y end-0">
                        <div>
                            <a href="https://www.facebook.com/" target="_blank">
                                <img className="social-img" src="images/facebook.png" alt="fb" />
                            </a>
                            <a href="https://twitter.com/" target="_blank">
                                <img className="social-img" src="images/twitter.png" alt="tw" />
                            </a>
                            <a href="https://youtube.com/" target="_blank">
                                <img className="social-img" src="images/youtube.png" alt="tw" />
                            </a>
                            <a href="https://linkedin.com/" target="_blank">
                                <img className="social-img" src="images/linkedin.png" alt="tw" />
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Footer;