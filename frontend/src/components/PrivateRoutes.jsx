import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import AuthContext from '../Context/AuthContext';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const location = useLocation();
  useEffect(() => {
    if (!user) {
      toast({
        description: 'You must login before accessing this page',
        status: 'warning',
        duration: 2000,
        position: 'top',
      });
    }
  }, [user, toast]);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};
export default PrivateRoutes;
