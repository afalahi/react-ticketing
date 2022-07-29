/** @format */

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/header/Header';
import PrivateRoutes from './components/PrivateRoutes';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/tickets/new' element={<NewTicket />} />
          <Route path='/tickets' element={<Tickets />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
