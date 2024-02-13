import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';


function CustomersWhoBoughtComp({prodid}) {
    const purchases = useSelector(state => state.purchases)
    const customers = useSelector((state) => state.customers)
    const [custWhoBought, setCustWhoBought] = useState()  
    useEffect(() => {
        const custs = customers.filter(cust =>
          purchases.some(
            purchase => purchase.customerId._id === cust._id && purchase.products.some(p => p._id === prodid)
          )
        );
        const custPurchs = custs.map(cust => {
          const purchase = purchases.find(purch => purch.customerId._id === cust._id && purch.productsId.some(p => p._id === prodid));
          return {
            
            name: cust.fname + cust.lname,
            purchaseDate: purchase ? purchase.date : null
          };
        })
    setCustWhoBought(custPurchs)
    console.log(custPurchs)
    }, [purchases])
    

    return (
      <>
      <ul>
        {
            custWhoBought?.map((per, index) => {console.log(per._id)
                return <li key={index}><Link to={per._id ? '/customers/customer/' + per._id : '/customers'}>
                {per.name}
              </Link></li>
            })
        }
      </ul>
      </>
    )
  }
  
  export default CustomersWhoBoughtComp