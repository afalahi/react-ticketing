import { useReducer, createContext } from 'react';

import authReducer from './authReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = {
    user: user ? user : null,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
