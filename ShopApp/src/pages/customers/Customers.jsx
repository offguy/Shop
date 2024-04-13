import { useMemo } from "react"
import { useSelector } from "react-redux"
import {  Outlet } from "react-router-dom";
import CustomerComp from "./Customer";
import BuyProductsComp from "./BuyProducts";



function CustomersComp() {

    const customers = useSelector((state) => state.customers.filter(cust => cust.status !== 'DELETED'))
    const memoizedCustomers = useMemo(() => customers, [customers]);
  
    return (
      <div>
      <h2>Customers</h2>
      <div className="grid">
        
        <table border={1}>
          <tbody>
            <tr>
            <td>Name</td>
            <td>Products</td>
            <td>purchased dates</td>
            </tr>
            {
              memoizedCustomers.map((cust)=> {
                return( <CustomerComp key={cust._id} cust={cust}/> )
              })
            }
          </tbody>
        </table>
        <div>
          <Outlet /> 
        </div>
        <div>
                    <BuyProductsComp />

        </div>
        </div>
      </div>
    )
  }
  
  export default CustomersComp