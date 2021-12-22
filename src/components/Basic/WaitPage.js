import { ProgressBar, Modal } from 'react-bootstrap';

function WaitPage(props) {
    return (
        <Modal show={props.isDisplay} aria-labelledby="contained-modal-title-vcenter" centered>
            <ProgressBar animated now={props.progress} variant="primary" />
        </Modal>
    );
}

export default WaitPage;