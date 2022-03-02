import { Alert } from "react-bootstrap";

function AppError({ errorText }) {
    return (
        <>
            {
                errorText
                    ? <Alert key="danger" variant="danger">
                        {errorText}
                    </Alert>
                    : ""
            }
        </>
    );
}

export default AppError;