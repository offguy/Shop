import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
function CustomerComp({ cust }) {
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  // Create a map to store the latest purchase date for each product
  const latestPurchaseDates = new Map();
  purchases.forEach((purchase) => {
    if (purchase.customerId === cust._id) {
      purchase.products.forEach((p) => {
        const productId = p.productId;
        const product = products.find((prod) => prod._id === productId);
        if (product) {
          const existingDate = latestPurchaseDates.get(productId);
          if (!existingDate || existingDate < purchase.date) {
            latestPurchaseDates.set(productId, purchase.date);
          }
        }
      });
    }
  });

  // Filter products that the customer bought and display them with the latest purchase date
  const purchasedProducts = [];
  latestPurchaseDates.forEach((date, productId) => {
    const product = products.find((prod) => prod._id === productId);
    if (product) {
      purchasedProducts.push({
        product: product,
        date: date,
      });
    }
  });

  return (
    <tr>
      <td>
        {Cookies.get("role") === "admin" ? <Link to={`customer/${cust._id}`}>
          {cust.fname} {cust.lname}
        </Link> : cust.fname + " " + cust.lname}
      </td>
      <td>
        {purchasedProducts.map((item, index) => (
          <div key={index}>
            <Link to={`../products/product/${item.product._id}`}>
              {item.product.name}
            </Link>
          </div>
        ))}
      </td>
      <td>
        {purchasedProducts.map((item, index) => (
          <div key={index}>{item.date}</div>
        ))}
      </td>
    </tr>
  );
}

export default CustomerComp;
