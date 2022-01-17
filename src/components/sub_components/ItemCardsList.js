import ItemCard from '../sub_components/ItemCard';

function ItemCardsList(props) {
//    console.log("props:: " + JSON.stringify(props.data));
    return (
        <div className="row pt-3 gy-0">
            {
                props.data.map((item, key) =>
                    <div key={key} className="col-sm-6 col-md-4 col-lg-3"><ItemCard itemDetail={item} /></div>
                )
            }
        </div>
    )
}
export default ItemCardsList;