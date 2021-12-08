function CartSummary() {
    return (
        <div className="card mt-4 bg-white shadow">
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" colSpan="2">Price Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">Price</td>
                    <td className="text-end">&#x20B9; 1000.00</td>
                </tr>
                <tr>
                    <td scope="row">Discount</td>
                    <td className="text-end">&#x20B9; 100.00</td>
                </tr>
                <tr>
                    <td scope="row">Delivery Charges</td>
                    <td className="text-end">&#x20B9; 40.00</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th scope="col">Total</th>
                    <th className="text-end">&#x20B9; 940.00</th>
                </tr>
            </thead>
        </table>
        </div>
    )
}
export default CartSummary;