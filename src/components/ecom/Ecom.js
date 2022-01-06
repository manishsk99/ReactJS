import ItemCardsList from '../sub_components/ItemCardsList';
import AppCarousel from '../sub_components/AppCarousel';
import { Alert, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import WaitPage from '../basic/WaitPage';
import { API_BASE_URL } from '../basic/Constants';

function Ecom() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [isApiError, setIsApiError] = useState(false);
    let [apiError, setApiError] = useState("");

    let [itemsList, setItemsList] = useState([]);

    useEffect(() => {

        document.title = "Home";
        setIsApiError(false);

        setIsDisplayWaitPage(true);
        setWaitPageProgress(50);
        fetch(API_BASE_URL + "items").then(res => res.json())
            .then(
                (responseJSON) => {
                    setWaitPageProgress(90);
                    setIsDisplayWaitPage(false);
                    // console.log(responseJSON);
                    // console.log("API Status:: " + responseJSON["success"]);
                    if (responseJSON["success"]) {
                        // console.log("responseJSON:: " + responseJSON["data"]);
                        setItemsList(responseJSON["data"]);
                        localStorage.setItem('items_json', JSON.stringify(responseJSON["data"]));
                    } else {
                        setIsApiError(true);
                        setApiError("Some error occurred.");
                        if (responseJSON["success"] === false) {
                            setApiError(responseJSON["message"]);
                        }
                    }
                },
                (error) => {
                    // console.log("Error:: " + error);
                    setIsDisplayWaitPage(false);
                    setIsApiError(true);
                    setApiError("Some error occurred.");
                    if(localStorage.getItem('items_json')) {
                        setItemsList( JSON.parse(localStorage.getItem('items_json')));
                    }
                }
            )
    }, []);

    return (
        <>
            <AppCarousel />
            <Container>
                <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />

                {isApiError ? <><br /> <Alert key="danger" variant="danger">
                        {apiError}
                    </Alert></> : ""}

                <ItemCardsList data={itemsList} />
            </Container>
        </>
    )
}

export default Ecom;