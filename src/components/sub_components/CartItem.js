function CardItem(props) {
    let item = props.itemDetail;
    return (
        <div className="card sm-3 mt-3 shadow">
            <div className="row g-0">
                <div className="col-sm-2">
                    <img src={`images/${item.img}`} className="cart-img img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-sm-8">
                    <div className="card-body">
                        <h5 className="card-title">item.title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="card-body">
                        <strong>&#x20B9; 1000.00</strong> <br />
                        <strike className="text-muted">&#x20B9; 1500.00</strike>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardItem;