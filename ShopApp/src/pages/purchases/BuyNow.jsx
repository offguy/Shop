import React from 'react';
import { SaveCartToDB } from '../../requests/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const BuyNowComp = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = async (cart) => {
    try {
      const {date, custId: customerId, _id: id, prods: products } = cart
      const processedProducts = products.map(prod => {
        const {_id: productId, quantity} = prod
        const data = {productId , quantity }
        return data
      });
      console.log({customerId, products: processedProducts})
        await SaveCartToDB({customerId, products: processedProducts});

      dispatch({type: 'RESET_CART'})
      navigate('http://localhost:5173/');
    } catch (error) {
      console.error('Failed to send cart data to server.', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleClick(cart)}>Buy Now</button>
    </div>
  );
};

export default BuyNowComp;
