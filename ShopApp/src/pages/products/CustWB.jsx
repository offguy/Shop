import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { useMemo } from "react"


function CustomersWhoBoughtComp({prodid}) {
    const purchases = useSelector(state => state.purchases)
    const customers = useSelector((state) => state.customers)
    const [custWhoBought, setCustWhoBought] = useState()  
    useEffect(() => {

        const custs = customers.filter(cust =>
          purchases.some(
            purchase => purchase.customerId === cust._id && purchase.products.some(p => p.productId === prodid)
          )
        );

        const custPurchs = custs.map(cust => {
        const purchase = purchases.find(purch => purch.customerId === cust._id && purch.products.some(p => p.productId === prodid));
          return {
            _id: cust._id,
            name: cust.fname + cust.lname,
            purchaseDate: purchase ? purchase.date : null
          };
        })
    setCustWhoBought(custPurchs)
    }, [purchases])
    
    const memoizedCustWB = useMemo(() => custWhoBought, [custWhoBought]);

    return (
      <>
      <ul>
        {
            memoizedCustWB?.map((per, index) => {
                return <li key={index}><Link to={`../customers/customer/${per._id}`}>
                {per.name}
              </Link> {per.purchaseDate}</li>
            })
        }
      </ul>
      </>
    )
  }
  
  export default CustomersWhoBoughtComp