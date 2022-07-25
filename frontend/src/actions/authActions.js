import axios from 'axios';
import { extractErrorMessage } from '../utils/extractErrorMessage';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const register = async userData => {
  try {
    const response = await axios.post(
      '/api/users/register',
      userData,
      axiosConfig
    );
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return await response.data;
  } catch (error) {
    return Promise.reject(extractErrorMessage(error));
  }
};

const login = async userData => {
  try {
    const response = await axios.post(
      '/api/users/login',
      userData,
      axiosConfig
    );
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return await response.data;
  } catch (error) {
    return Promise.reject(extractErrorMessage(error));
  }
};
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };
export default authService;
