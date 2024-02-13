import { Link } from "react-router-dom";

function NavComp() {

    
  
    return (
      <nav>
        <Link to='products'>   Products</Link>   
        <Link to='customers'>   Customers</Link>   
        <Link to='purchases'>   Purchases</Link>
   
      </nav>
    )
  }
  
  export default NavComp