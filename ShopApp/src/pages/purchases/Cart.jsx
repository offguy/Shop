// Import necessary modules
import { useEffect, useState } from "react";
import  {useSelector}  from "react-redux";
import { Link } from "react-router-dom";
import DispatchBTNComp from "../products/DispatchBTN";
import BuyNowComp from "./BuyNow";

function CartComp({accessToken}) {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isCartVisible, setCartVisibility] = useState(false);

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    let sum = 0;
    cart.prods?.forEach(
      (prod) => (sum += prod.status !== 'DELETED' ? prod.price * prod.quantity : 0)
    );
    setTotal(sum);
    setProducts(cart.prods);
    console.log(products)
  }, [cart?.prods]);

  const showCart = () => {
    setCartVisibility(true);
  };

  const hideCart = () => {
    setCartVisibility(false);
  };

  return (
    <div
      className={`cart-container ${isCartVisible ? "visible" : ""}`}
      onMouseOver={showCart}
      onMouseOut={hideCart}
    >
      {isCartVisible && (
        <div>
          <h2>Cart</h2>
          <h3>{total}</h3>
          {cart.date} <br />
          {products ? (
            <ul>
              {products.map(
                (prod) =>
                  prod.status !== 'DELETED' && (
                    <li key={prod._id}>
                      {prod.name} - ${prod.price} x {prod.quantity} ={" "}
                      {prod.price * prod.quantity}{" "}
                      <DispatchBTNComp prod={prod} status={"REMOVE"} />
                    </li>
                  )
              )} <BuyNowComp cart={cart} accessToken={accessToken} />
            </ul>
          ) : (
            <Link className="link-button" to="/home/products">
              <h3>Add products to cart</h3>
            </Link>
          )}
         
        </div>
      )}

      {/* Icon when cart is not visible */}
      {!isCartVisible && (
        <div className="cart-icon" onClick={showCart}>
          {/* Replace with your actual icon */}
          🛒
        </div>
      )}
    </div>
  );
}

export default CartComp;

