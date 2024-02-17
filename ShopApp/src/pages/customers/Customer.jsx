import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function CustomerComp({cust}) {
    const products = useSelector((state) => state.products)
    const purchases = useSelector((state) => state.purchases)
    
    // Filter products that the customer bought
    const prods = products.filter(prod => 
        purchases.some(purch => 
            purch.customerId._id === cust._id && purch.products.some(item => item.productId._id === prod._id)
        )
    )
console.log(prods)
    // Get all customer purchase dates
    const purchdates = purchases
        .filter(purch => purch.customerId._id === cust._id)
        .map(purch => purch.date);
    
    return (
        <tr>
            <td><Link to={`home/customers/customer/${cust._id}`}>{cust.fname} {cust.lname}</Link></td>
            <td>
                {prods.map(prod =>
                    <Link key={prod._id} to={`/products/product/${prod._id}`}>{prod.name}</Link>
                )}
            </td>
            <td>
                <ul>
                    {purchdates.map((date, index) =>
                        <li key={index}>{date}</li>
                    )}
                </ul>
            </td>
        </tr>
    );
}

export default CustomerComp;
