import React from 'react';
import {  saveCartToDB } from '../../requests/shopAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const BuyNowComp = ({ cart, accessToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = async () => {
    
    try {
      const {date, custId: customerId, prods: products } = cart
      const processedProducts = products.map(prod => {
        const {_id: productId, quantity} = prod
        const data = {productId , quantity }
        console.log(data)
        return data
      });
      console.log({customerId, products: processedProducts})
        await saveCartToDB({customerId, products: processedProducts}, accessToken);

      dispatch({type: 'RESET_CART'})
      navigate('http://localhost:5173/');
    } catch (error) {
      console.error('Failed to send cart data to server.', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Buy Now</button>
    </div>
  );
};

export default BuyNowComp;
