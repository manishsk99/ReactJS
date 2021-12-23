import { ProgressBar, Modal } from 'react-bootstrap';

function WaitPage(props) {
    // const [progress, setProgress] = useState(10);

    // useEffect(() => {
    //     const progressInterval = setInterval(() => {
    //         setProgress(progress + 10);
    //         console.log("called:: " + progress);
    //     }, 100);
    //     return () => {
    //         console.log("called clear:: " + progress);
    //         clearInterval(progressInterval);
    //     };
    // }, []);
    return (
        <Modal show={props.isDisplay} aria-labelledby="contained-modal-title-vcenter" centered>
            <ProgressBar animated now={props.progress} variant="primary" />
        </Modal>
    );
}

export default WaitPage;