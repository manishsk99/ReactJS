import { Container } from 'react-bootstrap';
import { BRAND_NAME, THEME_COLOR } from './Constants';

function Footer() {
    return (
        <>
            <div className={`bg-${THEME_COLOR} text-white w-100 p-3`}>
                <Container>
                    <div className="row">
                        <div className="col-sm-6">
                        &copy; 2021 {BRAND_NAME}. All rights reserved.
                        </div>
                        <div className="col-sm-6 text-sm-end">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
                                <img className="social-img" src="images/facebook.png" alt="fb" />
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" >
                                <img className="social-img" src="images/twitter.png" alt="tw" />
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" >
                                <img className="social-img" src="images/youtube.png" alt="tw" />
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" >
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