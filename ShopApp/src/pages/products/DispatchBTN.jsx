import { useDispatch } from "react-redux"


function DispatchBTNComp({prod , status}) {


  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({type: status + "PROD", payload: prod})
  }
  
    return (
      <>
      <button onClick={handleClick}>{status}</button>
      </>
    )
  }
  
  export default DispatchBTNComp