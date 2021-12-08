function ItemCard(props) {
    let item = props.itemDetail;
    return (
        <div className="pt-3 pb-3">
            <div className="card h-100 shadow">
                <img src={`images/${item.img}`} className="card-img-top" alt="..." />
                <div className="card-body align-text-bottom ">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                        Item short description. <br />
                        <span><strong>&#x20B9; 1000.00</strong> <strike className="text-muted">&#x20B9; 1500.00</strike></span>
                    </p>
                    <div className="row">
                        <div className="col-4">
                            <a href="#" class="btn btn-outline-primary">view</a>
                        </div>
                        <div className="col-8 text-end">
                            <a href="#" className="btn btn-primary ">Add to cart</a>
                        </div>
                    </div>
                </div>
                {/*
                    <div class="card-footer">
                        <small class="text-muted"></small>
                    </div> 
                */}
            </div>
        </div>
    )
}

export default ItemCard;