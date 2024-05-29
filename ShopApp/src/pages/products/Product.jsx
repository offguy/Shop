import { Link } from "react-router-dom"
import CustomersWhoBoughtComp from "./CustWB"
import DispatchBTNComp from "./DispatchBTN"
import  Cookies from "js-cookie";
function ProductComp({prod}) {

  
    return (
    <>
        <tr>
            <td>{Cookies.get("role") === "admin" ? <Link to={'product/' + prod._id} >{prod.name}</Link> : prod.name}</td>
            <td>{prod.price}</td>
            <td>{prod.quantity}</td>
            <td>{<CustomersWhoBoughtComp prodid={prod._id} />}</td>
            {prod.quantity > 0 && <td><DispatchBTNComp prod={{ ...prod, quantity: 1 }} status={'ADD'} /></td>}
        </tr>
        
    </>
    )
}
  
  export default ProductComp