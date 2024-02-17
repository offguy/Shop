import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomerComp() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [visibility, setVisibility] = useState('visible');

  const dispatch = useDispatch();
  const cust = useSelector((state) => state.customers.find((cust) => cust._id === id));
  const navigate = useNavigate()
  useEffect(() => {
    setVisibility(cust?.status === "DELETED" ? 'collapse' : 'visible');
  }, [customer ? customer : cust]);
  useEffect(() => {
    setCustomer({_id : id, status: 'DELETEPROD'})
  }, [id])
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!customer?.address || !customer.address.city || !customer.address.street || !customer.address.number) {
      alert('Please provide complete address information.');
      return;
    }
  
    console.log(dispatch({ type: customer.status, payload: customer ? customer : id }));
    setCustomer(null);
    navigate('home/customres')
  };
  
  const handleChange = (e) => {
    setCustomer({ ...cust, status: e.target.checked ? 'UPDATECUST' : 'DELETECUST' });
  };

  return (
    <div style={{ backgroundColor: 'green', color: 'black', visibility: visibility }}>
      <h2>Edit Customer</h2>
      <h6>id: {id}</h6>
      <h6>Customer</h6>
      {cust?.fname} {cust?.lname}

      <form hidden={cust ? false : true} onSubmit={handleSubmit}>
        DELETE/UPDATE <input type="checkbox" onChange={handleChange} /> <br />
        <div style={{ visibility: customer?.status !== 'UPDATECUST' ? 'collapse' : 'visible' }}>

          Address:
          <div>
            City<input type="text" onChange={(e) => setCustomer({ ...customer, address: { ...customer?.address, city: e.target.value } })} placeholder={cust?.address?.city} /> <br />
            Street<input type="text" onChange={(e) => setCustomer({ ...customer, address: { ...customer?.address, street: e.target.value } })} placeholder={cust?.address?.street} /> <br />
            Number<input type="text" onChange={(e) => setCustomer({ ...customer, address: { ...customer?.address, number: e.target.value } })} placeholder={cust?.address?.number} /> <br />
          </div>
        </div>

        <button type="submit" style={{ backgroundColor: 'black', color: 'white' }}>
        {customer?.status === 'UPDATECUST'? 'UPDATE': 'DELETE'}
        </button>
      </form>
    </div>
  );
}

export default EditCustomerComp;
