import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const location = useLocation();

  const microsoftToken = sessionStorage.getItem('@Origem:microsoftToken');

  return microsoftToken ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;
