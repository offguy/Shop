import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000';

const handleResponse = (response) => {
  if (!response.data) {
    throw new Error('Something went wrong');
  }
  return response.data;
};

export const fetchProducts = async (token) => {
  try {
    // console.log({'authorization': token}) 
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        'authorization': token  
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch products');
  }
};

export const fetchCustomers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`, {
      headers: {
        'authorization': token  
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch customers');
  }
};

export const fetchPurchases = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/purchases`, {
      headers: {
        'authorization': token  
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch purchases');
  }
};

export const saveCartToDB = async (cartData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/purchases`, cartData, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': token  
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to save cart data');
  }
};
