import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:3000/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        console.log(response);
        alert (response.data);
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error(error.response.data.message || 'Error registering user');
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        if (response.data.accessToken){
        const { data } = response
        return data
        }
    } catch (error) {
        console.error('Error logging in:', error.response.data);
    throw new Error(error.response.data || 'Error logging in');
    }
};




