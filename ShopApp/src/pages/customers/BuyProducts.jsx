import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";


function BuyProductsComp() {


  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((_id) => _id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedProducts = [...prevSelectedProducts];
      const existingProductIndex = updatedProducts.findIndex(
        (item) => item.prodId === productId
      );

      if (existingProductIndex !== -1) {
        // If the product is already in the array, update its quantity
        updatedProducts[existingProductIndex].quantity = quantity;
      } else {
        // If the product is not in the array, add it with the specified quantity
        updatedProducts.push({
          prodId: productId,
          quantity: quantity,
        });
      }

      return updatedProducts;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedProducts.forEach((selectedProd) => {
      const prod = products.find((prod) => prod._id.toString() === selectedProd.prodId);
      if (prod) {
        const disProd = {
          ...prod,
          quantity: selectedProd.quantity,
        }
        dispatch({
          type: 'ADDPROD',
          payload: disProd
        });
      }
    });

    // Clear the selected products after dispatching
    setSelectedProducts([]);
  };

  
  const [visab, setVisab] = useState("collapse")
  
  const changeVisavility = (e) => {
    visab === 'collapse'? setVisab('visible'): setVisab('collapse')
  }

    return (
      <>
      <button onClick={changeVisavility}>Buy Products</button>
      <div style={{visibility: visab}} >
      <form onSubmit={handleSubmit}>
        {products.map((prod) => (
          <div key={prod._id}>
            <label>
              <input
                type="checkbox"
                value={prod._id}
                checked={selectedProducts.includes(prod._id.toString())}
                onChange={() => handleCheckboxChange(prod._id.toString())}
              />
              <br />{prod.name} <br /> {prod.price}$ <br /> {prod.quantity} <br />
              <input
                onChange={(e) => handleQuantityChange(prod._id, e.target.value)}
                value={
                  selectedProducts.find((item) => item.prodId === prod._id)
                    ?.quantity || 0
                }
                min={0}
                max={prod.quantity}
                type="number"
              />
            </label>
          </div>
        ))}
        <br />
        <button type="submit">Add Selected Products</button>
      </form>   
    </div>
      
      </>
    )
  }
  
  export default BuyProductsComp