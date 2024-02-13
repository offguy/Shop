import { useSelector } from "react-redux"
import {  Outlet } from "react-router-dom"
import ProductComp from "./Product"

function ProductsComp() {
  
  const products = useSelector((state) => state.products.filter(prod => prod.status != 'DELETED'))

  
    return (
        
      <div>
        <h2>products</h2>
        <div className="grid">
           
        <table border={1}>
          <tbody>
            <tr>
            <td>Product Name</td>
            <td>Product Price</td>
            <td>Quantity</td>
            <td>Customers</td>
            </tr>
            {
              products.map((prod)=> {
                return( <ProductComp  key={prod._id} prod={prod}/> )


              })
              
            }
          </tbody>
        </table>
        
        <div >
        <Outlet />
        </div>
        
        </div>
        
       
      </div>
    )
  }
  
  export default ProductsComp