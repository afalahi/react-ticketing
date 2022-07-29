import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './app/store';
import { AuthProvider } from './Context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
