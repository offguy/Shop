import { useState } from "react"
import ChooseProductsComp from "./ChooseProducts"


function BuyProductsComp() {
  
  
  const [visab, setVisab] = useState("collapse")
  
  const changeVisavility = (e) => {
    visab === 'collapse'? setVisab('visible'): setVisab('collapse')
  }

    return (
      <>
      <button onClick={changeVisavility}>Buy Products</button>
      <div style={{visibility: visab}} >
        <ChooseProductsComp  />
      </div>
      
      </>
    )
  }
  
  export default BuyProductsComp