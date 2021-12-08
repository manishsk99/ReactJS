import ItemCard from '../sub_components/ItemCard';

function ItemCardsList() {
    return (
        <div className="row pt-3">
            <div className="col-sm-6 col-md-4 col-lg-3"><ItemCard itemDetail={{ "title": "Item1", "img": "item1.jpeg" }} /></div>
            <div className="col-sm-6 col-md-4 col-lg-3"><ItemCard itemDetail={{ "title": "Item2", "img": "item2.jpeg" }} /></div>
            <div className="col-sm-6 col-md-4 col-lg-3"><ItemCard itemDetail={{ "title": "Item3", "img": "item3.jpeg" }} /></div>
            <div className="col-sm-6 col-md-4 col-lg-3"><ItemCard itemDetail={{ "title": "Item4", "img": "item1.jpeg" }} /></div>
        </div>
    )
}
export default ItemCardsList;