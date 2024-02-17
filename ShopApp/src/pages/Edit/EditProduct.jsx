import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"


function EditProductComp() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const prod = useSelector((state) => state.products.filter(prod => prod._id == id)[0])
  console.log(product)
  useEffect(() => {
    setProduct({_id : id, status: 'DELETEPROD'})
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: product.status  , payload: product})
    navigate('home/products')
  }
  
    return (
      <div style={{backgroundColor: 'gray', color: 'white'}}>
      <h2>Edit Product</h2>
      <h4>product</h4>
      <h6>id: {id}</h6>
      {prod.name} <br />
      {prod.price}

      <form onSubmit={handleSubmit}>
        DELETE/UPDATE <input type="checkbox"  onChange={(e) => setProduct({...prod , status: e.target.checked? 'UPDATEPROD': 'DELETEPROD'}) } /> <br />
        <div style={{visibility: product?.status === 'UPDATEPROD'? 'visible': 'collapse'}}>
        Pruduct Name <br /><input type="text" onChange={(e) => setProduct({...product, name: e.target.value})} placeholder={prod.name}  /> <br />
        Price <br /><input type="text" onChange={(e) => setProduct({...product, price: +e.target.value})} placeholder={prod.price} /> <br /> <br /> 
        </div>

        <button type="submit" style={{backgroundColor: 'black', color: "white"}} >{product?.status === 'UPDATEPROD'? 'UPDATE': 'DELETE'}</button>
      </form>

      </div>
    )
  }
  
  export default EditProductComp