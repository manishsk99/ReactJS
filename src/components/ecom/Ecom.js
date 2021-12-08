import ItemCardsList from '../sub_components/ItemCardsList';
import AppCarousel from '../sub_components/AppCarousel';
import { Container } from 'react-bootstrap';
function Ecom() {
    return (
        <>
            <AppCarousel />
            <Container>
                <ItemCardsList />
            </Container>
        </>
    )
}

export default Ecom;