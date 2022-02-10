
function CartSummary({cartSummary}) {
    return (
        <div className="pt-3 pb-3">
        <div className="card mt-3 bg-white shadow">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" colSpan="2">Price Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Price</td>
                    <td className="text-end">&#x20B9; {cartSummary.itemTotalPrice}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td className="text-end">&#x20B9; {cartSummary.discountAmount}</td>
                </tr>
                <tr>
                    <td>Delivery Charges</td>
                    <td className="text-end">&#x20B9; {cartSummary.deliveryCharges}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th scope="col">Total</th>
                    <th className="text-end">&#x20B9; {cartSummary.totalAmount}</th>
                </tr>
            </thead>
        </table>
        </div>
        </div>
    )
}
export default CartSummary;