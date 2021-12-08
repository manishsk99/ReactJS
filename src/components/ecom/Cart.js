import CartItem from '../sub_components/CartItem';
import CartSummery from '../sub_components/CartSummery';
import { Container } from 'react-bootstrap';
function Cart() {
    return (
        <div className="bg-light">
            <Container>
            <div className="mb-3">
                <div className="row">
                    <div className="col-sm-8">
                        <CartItem itemDetail={{ "title": "Item1", "img": "item1.jpeg" }}/>
                        <CartItem itemDetail={{ "title": "Item2", "img": "item2.jpeg" }}/>
                        <CartItem itemDetail={{ "title": "Item3", "img": "item1.jpeg" }}/>
                        <CartItem itemDetail={{ "title": "Item4", "img": "item3.jpeg" }}/>
                    </div>
                    <div className="col-sm-4">
                        <CartSummery/>                        
                    </div>
                </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart;