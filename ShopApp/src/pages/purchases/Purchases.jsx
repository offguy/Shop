import { useState } from "react";
import { useSelector } from "react-redux";

function PurchasesComp() {
    const products = useSelector((state) => state.products);
    const customers = useSelector((state) => state.customers);
    const purchases = useSelector((state) => state.purchases);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
      console.log(selectedProduct)
        // Filter purchases based on selected criteria
        const filteredPurchases = purchases.filter((purchase) => {
            const productMatch = selectedProduct ? purchase.products.find(prod => prod._id === selectedProduct) : true;
            const customerMatch = selectedCustomer ? purchase.customerId._id === selectedCustomer : true;
            const dateMatch = selectedDate ? purchase.date.includes(selectedDate) : true;
            console.log(productMatch);
            return productMatch && customerMatch && dateMatch;
        });

        setSearchResults(filteredPurchases);
    };

    return (
        <div>
            <h1>Purchased Page</h1>
            <div>
                <label>Select Product:</label>
                <select onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="">All Products</option>
                    {products.map((product) => (
                        <option key={product._id} value={product._id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Customer:</label>
                <select onChange={(e) => {
                    setSelectedCustomer(e.target.value);
                    handleSearch(); // Trigger search when customer is selected
                }}>
                    <option value="">All Customers</option>
                    {customers.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                            {customer.fname} {customer.lname}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Enter Date:</label>
                <input type="text" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Search</button>

            <h2>Search Results:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {searchResults.map((result) => (
    <tr key={result._id}>
        <td>{result.customerId.fname} {result.customerId.lname}</td>
        <td>{result.products.map(prod => prod.productId.name)}</td>
        <td>{result.date}</td>
    </tr>
))}
</tbody>
            </table>
        </div>
    );
}

export default PurchasesComp;
