import ItemCardsList from '../sub_components/ItemCardsList';
import AppCarousel from '../sub_components/AppCarousel';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import WaitPage from '../basic/WaitPage';
import { API_BASE_URL } from '../basic/Constants';
import { HOME_BANNER_LIST } from '../basic/StaticData';
import AppError from '../sub_components/AppError';

function Ecom() {
    let [isDisplayWaitPage, setIsDisplayWaitPage] = useState(false);
    let [waitPageProgress, setWaitPageProgress] = useState(10);

    let [apiError, setApiError] = useState("");

    let [itemsList, setItemsList] = useState([]);

    useEffect(() => {

        document.title = "Home";

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
                        setApiError("Some error occurred.");
                        if (responseJSON["success"] === false) {
                            setApiError(responseJSON["message"]);
                        }
                    }
                },
                (error) => {
                    // console.log("Error:: " + error);
                    setIsDisplayWaitPage(false);
                    setApiError("Some error occurred.");
                    if(localStorage.getItem('items_json')) {
                        setItemsList( JSON.parse(localStorage.getItem('items_json')));
                    }
                }
            )
    }, []);

    return (
        <>
            <AppCarousel bannerList = {HOME_BANNER_LIST} />
            <Container>
                <WaitPage isDisplay={isDisplayWaitPage} progress={waitPageProgress} />
                <AppError errorText={apiError} />

                <ItemCardsList data={itemsList} />
            </Container>
        </>
    )
}

export default Ecom;