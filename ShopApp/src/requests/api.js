const API_BASE_URL = 'http://127.0.0.1:3000'; 

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return handleResponse(response);
};

export const fetchCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  return handleResponse(response);
};

export const fetchPurchases = async () => {
  const response = await fetch(`${API_BASE_URL}/purchases`);
  return handleResponse(response);
};
export const SaveCartToDB = async (cartData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error('Failed to send cart data to server.');
    }
  
    // Consume the response body once
    const responseData = await response.json();

    console.log(responseData);
  } catch (error) {
    console.error('Failed to send cart data to server.', error);
    throw error; // Re-throw the error for further handling
  }
};