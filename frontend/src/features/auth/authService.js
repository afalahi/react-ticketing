import axios from 'axios';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const register = async userData => {
  const response = await axios.post(
    '/api/users/register',
    userData,
    axiosConfig
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return await response.data;
};
const login = async userData => {
  const response = await axios.post('/api/users/login', userData, axiosConfig);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return await response.data;
};
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };
export default authService;
