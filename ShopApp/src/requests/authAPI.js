import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:3000/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        console.log(response.data);
        const {data} = response
        return data ;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};




