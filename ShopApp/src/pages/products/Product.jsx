import { Link } from "react-router-dom"
import CustomersWhoBoughtComp from "./CustWB"
import DispatchBTNComp from "./DispatchBTN"

function ProductComp({prod}) {

  
    return (
    <>
        <tr>
            <td><Link to={'home/products/product/' + prod._id} >{prod.name}</Link></td>
            <td>{prod.price}</td>
            <td>{prod.quantity}</td>
            <td>{<CustomersWhoBoughtComp prodid={prod._id} />}</td>
            {prod.quantity > 0 && <td><DispatchBTNComp prod={{ ...prod, quantity: 1 }} status={'ADD'} /></td>}
        </tr>
        
    </>
    )
}
  
  export default ProductComp